/**
 * @fileoverview Mutation resolver
 * CRUDで言うところのCreate/Update/Delete
 * MutationはGraphQLの予約語
 *
 * schema.graphqlのMutationで先に定義したプロパティ名と同じ名前にする必要がある
 */
import { GraphQLError } from "graphql";
import type { PrismaClient } from "@prisma/client";

const Mutation = {
  createTweet: async (
    _parent: any,
    args: { userId: number | string; data: { content: string } },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * こんな感じで登録できる
     * mutation {
     *   createTweet(userId: 1, data: { content: "mutationでtweetする1" }) {
     *     id
     *     content
     *     author {
     *       ... on User {
     *         id
     *         name
     *       }
     *       ... on UserNotFound {
     *         code
     *       }
     *     }
     *   }
     * }
     */

    const isUserExist = await context.prisma.user.findUnique({
      where: {
        id: Number(args.userId),
      },
    });

    if (!isUserExist) {
      throw new Error("User not found");
      // throw new GraphQLError("User not found", { extensions: { code: "MY_USER_NOT_FOUND" } });
    }

    const tweet = await context.prisma.tweet.create({
      data: {
        content: args.data.content,
        authorId: Number(args.userId),
      },
    });

    // クライアント側のキャッシュ(State)更新のために、必要なデータを返却する
    return tweet;
  },
  updateTweet: async (
    _parent: any,
    args: { tweetId: number | string; data: { content: string } },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * こんな感じで登録できる
     * mutation {
     *   updateTweet(tweetId: 7, data: { content: "mutationでtweetをupdateする1" }) {
     *     id
     *     content
     *     author {
     *       ... on User {
     *         id
     *         name
     *       }
     *       ... on UserNotFound {
     *         code
     *       }
     *     }
     *   }
     * }
     */

    const isTweetExist = await context.prisma.tweet.findUnique({
      where: {
        id: Number(args.tweetId),
      },
    });

    if (!isTweetExist) {
      throw new Error("Tweet not found");
      // throw new GraphQLError("Tweet not found", { extensions: { code: "MY_TWEET_NOT_FOUND" } });
    }

    const tweet = await context.prisma.tweet.update({
      where: {
        id: Number(args.tweetId),
      },
      data: {
        content: args.data.content,
      },
    });

    // クライアント側のキャッシュ(State)更新のために、必要なデータを返却する
    return tweet;
  },
  deleteTweet: async (
    _parent: any,
    args: { tweetId: number | string },
    context: { prisma: PrismaClient },
    _info: any
  ) => {
    /**
     * こんな感じで登録できる
     * mutation {
     *   deleteTweet(tweetId: 7) {
     *     id
     *     content
     *     author {
     *       ... on User {
     *         id
     *         name
     *       }
     *       ... on UserNotFound {
     *         code
     *       }
     *     }
     *   }
     * }
     */

    const isTweetExist = await context.prisma.tweet.findUnique({
      where: {
        id: Number(args.tweetId),
      },
    });

    if (!isTweetExist) {
      throw new Error("Tweet not found");
      // throw new GraphQLError("Tweet not found", { extensions: { code: "MY_TWEET_NOT_FOUND" } });
    }

    const tweet = await context.prisma.tweet.delete({
      where: {
        id: Number(args.tweetId),
      },
    });

    // クライアント側のキャッシュ(State)更新のために、必要なデータを返却する
    return tweet;
  },
};

export default Mutation;
