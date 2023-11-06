import dotenv from "dotenv";
import path from "path";
import type { CodegenConfig } from "@graphql-codegen/cli";
import type { IGraphQLConfig } from "graphql-config";

dotenv.config({
  path: path.resolve(process.cwd(), "envs", "dev.env"),
});

const codegenConfig: CodegenConfig = {
  generates: {
    "./src/api/schema.ts": {
      plugins: ["typescript"],
    },
    "./src/api/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "schema.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
  },
};

const graphqlConfig: IGraphQLConfig = {
  schema: "http://localhost:4000/",
  documents: ["./src/api/**/*.graphql"],
  extensions: {
    codegen: codegenConfig,
  },
};

export default graphqlConfig;
