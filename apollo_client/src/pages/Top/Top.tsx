import { Link } from "wouter";
import { useQuery } from "@apollo/client";

import { GetTweetsDocument } from "../../api/__generated__/graphql";
import style from "./Top.module.css";

export const Top = () => {
  const { data, loading, error } = useQuery(GetTweetsDocument, {
    variables: { text: "" },
    errorPolicy: "all",
  });

  if (loading) {
    <div>loading......</div>;
  }

  if (error) {
    <div>error</div>;
  }

  const tweets = data?.tweets ?? [];

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
