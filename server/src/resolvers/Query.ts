/**
 * @fileoverview Query resolver
 * CRUDで言うところのRead
 * QueryはGraphQLの予約語
 *
 * schema.graphqlのQueryで先に定義したプロパティ名と同じ名前にする必要がある
 */
import { GraphQLError } from "graphql";
import type { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { extractInvalidTweets } from "../helper/extractInvalidTweet";

const Query = {
  /**
   * user: ID指定したユーザの情報を返却するresolver
   */
  user: async (
    _parent: any,
    args: { id: number | string },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * query {
     *   user1: user(id: 1) {
     *     ... on User {
     *       name
     *     }
     *   }
     *   user2: user(id: 2) {
     *     ... on User {
     *       name
     *     }
     *   }
     *   user100: user(id: 100) {
     *     ... on User {
     *       name
     *     }
     *     ...on UserNotFound {
     *       code
     *     }
     *   }
     * }
     *
     * 1回で複数のリクエストを送ることも可能
     */

    try {
      const user = await context.prisma.user.findUnique({
        where: {
          id: Number(args.id),
        },
      });

      /**
       * query {
       *   user(id: 100) {
       *     ... on User {
       *       id
       *       name
       *     }
       *     ... on UserNotFound {
       *       code
       *     }
       *   }
       * }
       * こんなクエリをかくとMY_NOT_FOUND_ERRORが返ってくる
       */
      if (!user) {
        return {
          __typename: "UserNotFound",
          code: "MY_NOT_FOUND_ERROR",
        };
      }

      /**
       * query {
       *   user(id: 1) {
       *     ... on User {
       *       id
       *       name
       *     }
       *     ... on UserNotFound {
       *       code
       *     }
       *   }
       * }
       * こんなクエリをかくとUser情報が返ってくる
       */
      return {
        __typename: "User",
        ...user,
      };
    } catch (error) {
      // 指定のエラーを上書きできることの実験的なサンプル(実際には適切ではないので使わない)
      // throw new GraphQLErrorせずにreturnすれば、dataの方にエラーを詰めることもできるっちゃできる
      /**
       * query {
       *   user(id: "hoge") {
       *     ... on User {
       *       id
       *       name
       *     }
       *     ... on UserNotFound {
       *       code
       *     }
       *   }
       * }
       * こんなクエリをかくとMY_PRISMA_CLIENT_VALIDATION_ERRORが返ってくる
       */
      if (error instanceof PrismaClientValidationError) {
        throw new GraphQLError(error.message, {
          extensions: { code: "MY_PRISMA_CLIENT_VALIDATION_ERROR" },
        });
      }

      throw error;
    }
  },
  /**
   * users: ユーザ一覧を返却するresolver
   */
  users: async (
    _parent: any,
    args: { name?: string },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * query {
     *   users {
     *     id,
     *     name
     *   }
     * }
     * 引数なしでアクセスされた場合、ユーザ全件を返す
     */
    if (!args.name) {
      return await context.prisma.user.findMany();
    }

    /**
     * query(name: "田中") {
     *   users {
     *     id,
     *     name
     *   }
     * }
     * 引数ありでアクセスされた場合、部分一致で名前が一致するユーザ一覧を返す
     */
    return await context.prisma.user.findMany({
      where: {
        name: {
          contains: args.name,
        },
      },
    });
  },
  /**
   * tweets: ツイート一覧を返却するresolver
   */
  tweets: async (
    _parent: any,
    args: { text?: string },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * query {
     *   tweets {
     *     id,
     *     content
     *     author {
     *       id
     *     }
     *     comments {
     *       id
     *     }
     *   }
     * }
     * 引数なしでアクセスされた場合、ユーザ全件を返す
     *
     * authorとcommentsはスカラー値ではないので、展開する必要があるが、resolver chainsによるリレーションの解決をしていない状態だと
     * Cannot return null for non-nullable field Tweet.author. のエラーで落ちる
     */
    if (!args.text) {
      const tweets = await context.prisma.tweet.findMany();
      return extractInvalidTweets(tweets);
    }

    /**
     * query(text: "ツイート1") {
     *   tweets {
     *     id,
     *     content
     *     author {
     *       id
     *     }
     *     comments {
     *       id
     *     }
     *   }
     * }
     * 引数ありでアクセスされた場合、部分一致で名前が一致するユーザ一覧を返す
     *
     * authorとcommentsはスカラー値ではないので、展開する必要があるが、resolver chainsによるリレーションの解決をしていない状態だと
     * Cannot return null for non-nullable field Tweet.author. のエラーで落ちる
     */
    const tweets = await context.prisma.tweet.findMany({
      where: {
        content: {
          contains: args.text,
        },
      },
    });

    return extractInvalidTweets(tweets);
  },
  /**
   * comments: コメント一覧を返却するresolver
   */
  comments: async (
    _parent: any,
    args: { text?: string },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * query {
     *   comments {
     *     id,
     *     content
     *     author {
     *       id
     *     }
     *     tweet {
     *       id
     *     }
     *   }
     * }
     * 引数なしでアクセスされた場合、ユーザ全件を返す
     *
     * authorとtweetはスカラー値ではないので、展開する必要があるが、resolver chainsによるリレーションの解決をしていない状態だと
     * Cannot return null for non-nullable field Comment.author. のエラーで落ちる
     */
    if (!args.text) {
      return await context.prisma.comment.findMany();
    }

    /**
     * query(text: "ツイート1") {
     *   comments {
     *     id,
     *     content
     *     author {
     *       id
     *     }
     *     tweet {
     *       id
     *     }
     *   }
     * }
     * 引数ありでアクセスされた場合、部分一致で名前が一致するユーザ一覧を返す
     *
     * authorとtweetはスカラー値ではないので、展開する必要があるが、resolver chainsによるリレーションの解決をしていない状態だと
     * Cannot return null for non-nullable field Comment.author. のエラーで落ちる
     */
    return await context.prisma.comment.findMany({
      where: {
        content: {
          contains: args.text,
        },
      },
    });
  },
};

export default Query;
