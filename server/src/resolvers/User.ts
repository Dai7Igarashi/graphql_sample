/**
 * @fileoverview User resolver
 * Userに関連するresolver chainsを記述するファイル
 * @see {@link https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains}
 *
 * schema.graphqlで先に定義したプロパティ名と同じ名前にする必要がある
 *
 * type User {
 *   tweets: [Tweet!]!
 *   comments: [Comment!]!
 * }
 *
 * これら2つのリレーションを解決する
 *
 * 詳しくは ./resolvers/Tweet.ts で解説してます
 */
import type { PrismaClient } from "@prisma/client";
import { extractInvalidTweets } from "../helper/extractInvalidTweet";

const User = {
  tweets: async (
    parent: any, // parentにはuserのEntity(DBの実態)が入る. prismaのmodelを参照のこと.
    _args: any,
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    const tweets = await context.prisma.tweet.findMany({
      where: {
        authorId: parent.id,
      },
    });

    return extractInvalidTweets(tweets);
  },
  comments: async (
    parent: any, // parentにはuserのEntity(DBの実態)が入る. prismaのmodelを参照のこと.
    _args: any,
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    return await context.prisma.tweet.findMany({
      where: {
        authorId: parent.id,
      },
    });
  },
};

export default User;
