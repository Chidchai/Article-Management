export type articleForm = {
  id: string;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
  coverImage: string;
  status: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyphrase: string;
  created_by: string;
};

export type Article = {
  id: number;
  slug: string;
  title: string;
  content: string;
  cover: string;
  excerpt: string;
};
