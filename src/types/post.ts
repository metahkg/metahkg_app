export type postType = {
  comments: any[];
  id: number;
  score: number;
  type: "link" | "text";
  title: string;
  author: string;
  category: number;
  text?: string;
  created: number;
  url?: string;
  votes: any[];
  views: number;
  setData: React.Dispatch<React.SetStateAction<postType | null>>;
};
