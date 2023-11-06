/**
 * @fileoverview Comment resolver
 * Commentに関連するresolver chainsを記述するファイル
 * @see {@link https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains}
 *
 * schema.graphqlで先に定義したプロパティ名と同じ名前にする必要がある
 *
 * type Comment {
 *   author: User!
 *   tweet: Tweet!
 * }
 *
 * これら2つのリレーションを解決する
 *
 * 詳しくは ./resolvers/Tweet.ts で解説してます
 */
import type { PrismaClient } from "@prisma/client";
import { extractInvalidTweet } from "../helper/extractInvalidTweet";

const Comment = {
  author: async (
    parent: any, // parentにはcommentのEntity(DBの実態)が入る. prismaのmodelを参照のこと.
    _args: any,
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    const user = await context.prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });

    // tweetしたUserのデータがないことはエラーに該当する
    if (!user) {
      return {
        __typename: "UserNotFound",
        code: "MY_NOT_FOUND_ERROR",
      };
    }

    return {
      __typename: "User",
      ...user,
    };
  },
  tweet: async (
    parent: any, // parentにはcommentのEntity(DBの実態)が入る. prismaのmodelを参照のこと.
    _args: any,
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    const tweet = await context.prisma.tweet.findUnique({
      where: {
        id: parent.tweetId,
      },
    });

    return extractInvalidTweet(tweet);
  },
};

export default Comment;

/**
 * memo
 * resolver chainsを用いると下記のようなネストしたリレーションの解決もできる
 *
 * query {
 *   comments(text: "ツイート1") {
 *     content
 *     author {
 *       id
 *       name
 *     }
 *     tweet {
 *       id
 *       content
 *       author {
 *         id
 *        name
 *       }
 *     }
 *   }
 * }
 *
 * ただしN+1問題が発生する可能性があるので、許容しないか独自でSQL文発行しても良いかもしれない。
 */
