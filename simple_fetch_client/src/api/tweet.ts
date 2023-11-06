import { User } from "../typeDef/entity/user";
import { Tweet } from "../typeDef/entity/tweet";

export interface FetchTweetsSuccessResponse {
  __typename: "User";
  id: Tweet["id"];
  content: Tweet["content"];
  author: {
    __typename: string;
    id: User["id"];
    name: User["name"];
  };
}

export interface FetchTweetsFailureResponse {
  __typename: "InvalidTweet";
  code: string;
}

export type FetchTweetsResponse =
  | FetchTweetsSuccessResponse
  | FetchTweetsFailureResponse;

export const fetchTweets = (text?: string) => {
  return fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetTweets($text: String) {
          tweets(text: $text) {
            ... on Tweet {
              __typename
              id
              content
              author {
                ... on User {
                  __typename
                  id
                  name
                }
                ... on UserNotFound {
                  code
                }
              }
            }
            ... on InvalidTweet {
              __typename
              code
            }
          }
        }
      `,
      variables: { text },
    }),
  });
};

export interface CreateTweetResponse {
  __typename: string;
  id: Tweet["id"];
  content: Tweet["content"];
  author: {
    __typename: string;
    id: User["id"];
    name: User["name"];
  };
}

export const createTweet = (userId: string, data: { content: string }) => {
  return fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation CreateTweet($userId: ID!, $data: TweetInput!) {
          createTweet(userId: $userId, data: $data) {
            __typename
            id
            content
            author {
              ... on User {
                __typename
                id
                name
              }
              ... on UserNotFound {
                code
              }
            }
          }
        }
      `,
      variables: { userId, data },
    }),
  });
};
