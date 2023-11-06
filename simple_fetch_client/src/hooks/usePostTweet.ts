import { useState, useCallback } from "react";

import { createTweet } from "../api/tweet";
import type { CreateTweetResponse } from "../api/tweet";

export const usePostTweet = () => {
  const [tweet, setTweet] = useState<CreateTweetResponse>();

  const handleCreateTweet = useCallback(
    async (userId: string, data: { content: string }) => {
      try {
        const response = await createTweet(userId, data);
        const json = await response.json();
        const tweet = json.data.createTweet as CreateTweetResponse;
        setTweet(tweet);
      } catch (error) {
        console.error(error);
        setTweet(undefined);
      }
    },
    []
  );

  return { tweet, handleCreateTweet };
};
