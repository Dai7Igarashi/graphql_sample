export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  author: UserResult;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tweet: TweetsResult;
};

export type InvalidTweet = {
  __typename?: 'InvalidTweet';
  code: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTweet: Tweet;
  deleteTweet: Tweet;
  updateTweet: Tweet;
};


export type MutationCreateTweetArgs = {
  data: TweetInput;
  userId: Scalars['ID']['input'];
};


export type MutationDeleteTweetArgs = {
  tweetId: Scalars['ID']['input'];
};


export type MutationUpdateTweetArgs = {
  data: TweetInput;
  tweetId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  tweets: Array<TweetsResult>;
  user: UserResult;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  text?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTweetsArgs = {
  text?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  author: UserResult;
  comments: Array<Comment>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type TweetInput = {
  content: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tweets: Array<TweetsResult>;
};

export type UserNotFound = {
  __typename?: 'UserNotFound';
  code: Scalars['String']['output'];
};

export type TweetsResult = InvalidTweet | Tweet;

export type UserResult = User | UserNotFound;
