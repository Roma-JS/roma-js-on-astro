export interface AboutInfo {
  title: string;
  description: string;
  createdAt: Date;
  author: string;
  categories: string[];
  layout: string;
  lang: string;
}

export interface AboutContent extends AboutInfo {
  content: string;
}
