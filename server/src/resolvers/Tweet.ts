/**
 * @fileoverview Tweet resolver
 * Tweetに関連するresolver chainsを記述するファイル
 * @see {@link https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains}
 *
 * schema.graphqlで先に定義したプロパティ名と同じ名前にする必要がある
 *
 * type Tweet {
 *   author: User!
 *   comments: [Comment!]!
 * }
 *
 * これら2つのリレーションを解決する
 */
import type { PrismaClient } from "@prisma/client";

const Tweet = {
  /**
   * tweetが紐づくuserのリレーションを解決する
   * これにより以下のリクエストでエラーが出なくなる
   * query {
   *   tweets {
   *     author { <-- tweetしたuser情報が解決できるようになる
   *       id
   *     }
   *   }
   * }
   */
  author: async (
    parent: any, // parentにはtweetのEntity(DBの実態)が入る. prismaのmodelを参照のこと.
    _args: any,
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    // parent.authorId(tweetしたUserのid, DBの情報)を元に、User!のデータを取得する
    // author: User!で単一なので、UserテーブルのidとTweetテーブルのauthorIdが一致するユーザを1件のみ取得する
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
  /**
   * tweetに紐づくcommentsのリレーションを解決する
   * これにより以下のリクエストでエラーが出なくなる
   * query {
   *   tweets {
   *     comments { <-- tweetに紐づいたcomments情報が解決できるようになる
   *       id
   *     }
   *   }
   * }
   */
  comments: async (
    parent: any, // parentにはtweetのEntity(DBの実態)が入る. prismaのmodelを参照のこと.
    _args: any,
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    // parent.tweetId(commentが紐づくtweetのid, DBの情報)を元に、[Comment!]!のデータを取得する
    // comments: [Comment!]!で配列なので、CommentテーブルのtweetIdがTweetテーブルのidと一致するコメントを全件取得する
    return await context.prisma.comment.findMany({
      where: {
        tweetId: parent.id,
      },
    });
  },
};

export default Tweet;
