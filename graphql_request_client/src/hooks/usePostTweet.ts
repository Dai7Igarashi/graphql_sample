import { useState, useCallback } from "react";

import tweetApi from "../api/tweet";
import type { CreateTweetMutation } from "../api/tweet/tweet.generated";

export const usePostTweet = () => {
  const [tweet, setTweet] = useState<CreateTweetMutation["createTweet"]>();

  const handleCreateTweet = useCallback(
    async (userId: string, data: { content: string }) => {
      try {
        const response = await tweetApi.createTweet(userId, data);
        setTweet(response.createTweet);
      } catch (error) {
        console.error(error);
        setTweet(undefined);
      }
    },
    []
  );

  return { tweet, handleCreateTweet };
};
