import { createGraphqlClient } from "../graphqlClient";
import { GetTweetsDocument, CreateTweetDocument } from "./tweet.generated";
import type {
  GetTweetsQuery,
  GetTweetsQueryVariables,
  CreateTweetMutation,
  CreateTweetMutationVariables,
} from "./tweet.generated";

const client = createGraphqlClient();

export const fetchTweets = (text?: string) => {
  return client.request<GetTweetsQuery, GetTweetsQueryVariables>(
    GetTweetsDocument,
    {
      text,
    }
  );
};

export const createTweet = (userId: string, data: { content: string }) => {
  return client.request<CreateTweetMutation, CreateTweetMutationVariables>(
    CreateTweetDocument,
    {
      userId,
      data,
    }
  );
};
