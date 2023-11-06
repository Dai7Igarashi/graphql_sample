import { useCallback, useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@apollo/client";

import { CreateTweetDocument } from "../../api/__generated__/graphql";
import style from "./Post.module.css";

export const Post = () => {
  const [userId, setUserId] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [handleCreateTweet, { data, loading, error }] = useMutation(
    CreateTweetDocument,
    {
      variables: { userId, data: { content } },
      errorPolicy: "all",
    }
  );

  const handleChangeUserId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value);
    },
    []
  );
  const handleChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    []
  );

  if (loading) {
    <div>loading......</div>;
  }

  if (error) {
    <div>error</div>;
  }

  const tweet = data?.createTweet;

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
      <div className={style.Block}>
        <form>
          <label className={style.Label}>
            <span className={style.LabelText}>userId</span>
            <input
              onChange={handleChangeUserId}
              value={userId}
              type="text"
              name="userId"
            />
          </label>
          <label className={style.Label}>
            <span className={style.LabelText}>content</span>
            <input
              onChange={handleChangeContent}
              value={content}
              type="text"
              name="content"
            />
          </label>
          <button
            className={style.Button}
            type="button"
            onClick={() =>
              handleCreateTweet({ variables: { userId, data: { content } } })
            }
          >
            投稿する
          </button>
        </form>
      </div>
      <div>
        Posted Response
        <ul>
          <li>tweet id: {tweet?.id}</li>
          <li>tweet content: {tweet?.content}</li>
          {tweet?.author?.__typename === "User" ? (
            <>
              <li>author id: {tweet?.author?.id}</li>
              <li>author name: {tweet?.author?.name}</li>
            </>
          ) : (
            <>
              <li>author code: {tweet?.author?.code}</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
