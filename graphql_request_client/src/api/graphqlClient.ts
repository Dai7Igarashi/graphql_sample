/**
 * @fileoverview graphqlを叩くためのfetchクライアント
 *
 * NOTE: graphql-request内部でcross-fetchが使われていますが、様々なHTTPクライアントが混在するとメンテが大変なので、他と同様にglobalに定義されたfetchを利用します。
 * graphql-requestでcross-fetchが利用されている箇所 @see {@link https://github.com/jasonkuhrt/graphql-request/blob/6.1.0/src/index.ts#L199}
 * globalに定義されたfetchの実装箇所 @see {@link https://ghe.ca-tools.org/tama/tama-web/blob/develop/webpack/polyfills/serverPolyfill.js}
 */
import { GraphQLClient } from "graphql-request";
import type { RequestConfig } from "graphql-request/src/types";

export const createGraphqlClient = (options: RequestConfig = {}) => {
  return new GraphQLClient("http://localhost:4000/", {
    ...options,
    errorPolicy: "all",
  });
};
