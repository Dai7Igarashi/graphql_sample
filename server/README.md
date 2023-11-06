# server

GraphQL サーバと MySQL DB を管理するフォルダです。

## GraphiQL

ブラウザで GraphQL を叩けます。[http://localhost:4000](http://localhost:4000) にアクセスしてください。

※ クライアントから実際に叩くエンドポイントも http://localhost:4000 で同じです。

### document の例

- user 一覧取得

  ```graphql
  query {
    users {
      name
    }
  }
  ```

- tweet 一覧取得
  ```graphql
  query {
    tweets {
      ... on Tweet {
        id
        content
        author {
          ... on User {
            name
          }
          ... on UserNotFound {
            code
          }
        }
        comments {
          id
          author {
            ... on User {
              name
            }
            ... on UserNotFound {
              code
            }
          }
        }
      }
      ... on InvalidTweet {
        code
      }
    }
  }
  ```
