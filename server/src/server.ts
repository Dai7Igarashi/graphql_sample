import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

import Query from "./resolvers/Query";
import Tweet from "./resolvers/Tweet";
import Comment from "./resolvers/Comment";
import User from "./resolvers/User";
import Mutation from "./resolvers/Mutation";

const prisma = new PrismaClient();

const main = async () => {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "./schema.graphql"), "utf8"),
    resolvers: {
      Query,
      Tweet,
      Comment,
      User,
      Mutation,
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
      prisma,
    }),
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
