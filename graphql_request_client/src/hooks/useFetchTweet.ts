import { useState, useEffect } from "react";

import tweetApi from "../api/tweet";
import type { GetTweetsQuery } from "../api/tweet/tweet.generated";

export const useFetchTweet = (text?: string) => {
  const [tweets, setTweets] = useState<GetTweetsQuery["tweets"]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await tweetApi.fetchTweets(text);
        setTweets(response.tweets);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [text]);

  return { tweets };
};
