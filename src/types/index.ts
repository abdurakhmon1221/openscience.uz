export type User = {
  id: string;
  name: string;
  email: string;
  role: 'AUTHOR' | 'EDITOR' | 'ADMIN';
  orcid?: string;
  institution?: string;
};

export type ArticleStatus = 'PENDING' | 'REVIEWING' | 'REJECTED' | 'PUBLISHED';

export type Article = {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  authors: { name: string; email?: string; orcid?: string; institution?: string }[];
  status: ArticleStatus;
  submittedAt: string;
  publishedAt?: string;
  pdfUrl?: string;
  doi?: string;
  views: number;
  downloads: number;
  volume?: number;
  issue?: number;
  submitterId: string;
};

export type EditorialMember = {
  id: string;
  name: string;
  role: string;
  institution: string;
  degree?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
};
