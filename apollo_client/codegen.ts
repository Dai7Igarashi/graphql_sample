import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/",
  documents: ["./src/api/**/*.graphql"],
  generates: {
    "./src/api/__generated__/schema.ts": {
      plugins: ["typescript"],
    },
    "./src/api/__generated__/": {
      preset: "client",
    },
  },
};

export default config;
