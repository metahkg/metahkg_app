import { userType } from "./user";

export type summaryType = {
  id: number;
  op: userType;
  c: number;
  vote: number;
  slink: string;
  title: string;
  category: number;
  lastModified: string;
  createdAt: string;
};
export type authorType = {
  username: string;
  id: number;
};
export type voteType = "U" | "D"
export type commentType = {
  id: number;
  U: number;
  D: number;
  user: userType;
  createdAt: string;
  slink: string;
  comment: string;
  replies?: number[];
};
export type threadType = summaryType & { conversation: commentType[] };
export type postType = {
  comments: commentType[];
  id: number;
  score: number;
  type: "link" | "text";
  title: string;
  author: authorType;
  category: number;
  text: string;
  created: number;
  url: string;
  votes: voteType[];
  views: number;
  setData: React.Dispatch<React.SetStateAction<postType | null>>;
};
