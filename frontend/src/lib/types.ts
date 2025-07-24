export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  reputation: number;
  articlesPublished: number;
  totalVotes: number;
  joinedDate: string;
  walletAddress: string;
  verified: boolean;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  verificationScore: number;
  voteCount: number;
  upvotes: number;
  downvotes: number;
  status: "draft" | "published" | "under_review" | "verified";
  premium: boolean;
  price: number; // in MAS
  chapters: ArticleChapter[];
  stakingAmount: number;
  ipfsHash: string;
  transactionHash: string;
}

export interface ArticleChapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Vote {
  id: string;
  articleId: string;
  voterId: string;
  voteType: "up" | "down" | "fact_check";
  reason: string;
  timestamp: string;
  stake: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "basic" | "premium" | "professional";
  status: "active" | "cancelled" | "expired";
  startDate: string;
  endDate: string;
  price: number;
}

export interface User {
  id: string;
  walletAddress: string;
  name?: string;
  email?: string;
  avatar?: string;
  subscription?: Subscription;
  preferences: {
    categories: string[];
    notifications: boolean;
  };
}
