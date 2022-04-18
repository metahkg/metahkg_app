export type authorType = {
  username: string;
  id: number;
};
export type voteType = {
  user: number;
  vote: 1 | -1;
}
export type commentType = {
  id: number;
  score: number;
  votes: voteType[];
  user: number;
  created: number;
};
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
