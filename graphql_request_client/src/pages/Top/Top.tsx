import { Link } from "wouter";

import { useFetchTweet } from "../../hooks/useFetchTweet";
import style from "./Top.module.css";

export const Top = () => {
  const { tweets } = useFetchTweet();

  return (
    <>
      <ul>
        <li>
          <Link href="/">Top</Link>
        </li>
        <li>
          <Link href="/post">Post</Link>
        </li>
      </ul>
      <ul className={style.List}>
        {tweets
          .slice()
          .reverse()
          .map((tweet, idx) => {
            if (tweet.__typename === "InvalidTweet") {
              return (
                <li key={`${tweet.code}_${idx}`}>
                  <p>code: {tweet.code}</p>
                </li>
              );
            }

            return (
              <li key={tweet.id}>
                {tweet.author.__typename === "User" ? (
                  <>
                    <p>author id: {tweet.author.id}</p>
                    <p>author name: {tweet.author.name}</p>
                  </>
                ) : (
                  <>
                    <p>author code: {tweet.author.code}</p>
                  </>
                )}
                <p>tweet id: {tweet.id}</p>
                <p>tweet content: {tweet.content}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};
