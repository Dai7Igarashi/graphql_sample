import { useState, useEffect } from "react";

import { fetchTweets } from "../api/tweet";
import type { FetchTweetsResponse } from "../api/tweet";

export const useFetchTweet = (text?: string) => {
  const [tweets, setTweets] = useState<FetchTweetsResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchTweets(text);
        const { data } = await response.json();
        const tweets = data.tweets as FetchTweetsResponse[];
        setTweets(tweets);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [text]);

  return { tweets };
};
