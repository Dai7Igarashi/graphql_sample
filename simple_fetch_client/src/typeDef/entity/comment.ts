import type { User } from "./user";
import type { Tweet } from "./tweet";

export interface Comment {
  id: number | string;
  content: string;
  author: User;
  tweet: Tweet;
}
