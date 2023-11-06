import type { Tweet } from "./tweet";

export interface User {
  id: number | string;
  name: string;
  tweets: Tweet[];
}
