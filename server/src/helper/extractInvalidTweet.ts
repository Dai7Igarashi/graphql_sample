/**
 * 実験として、contentに「不正」の文字が含まれるtweetの場合は、tweetオブジェクトではなくエラーオブジェクトを返す
 */
export function extractInvalidTweet(tweet: any) {
  if (tweet.content.includes("不正")) {
    return {
      __typename: "InvalidTweet",
      code: "MY_INVALID_TWEET_ERROR",
    };
  }

  return {
    __typename: "Tweet",
    ...tweet,
  };
}

export function extractInvalidTweets(tweets: any[]) {
  return tweets.map((tweet) => extractInvalidTweet(tweet));
}
