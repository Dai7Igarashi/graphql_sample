import type { User } from "./user";
import type { Comment } from "./comment";

export interface Tweet {
  id: number | string;
  content: string;
  author: User;
  comments: Comment[];
}
