export interface Transaction {
  id: string;
  type: 'mal' | 'fitrah';
  amount: number;
  date: string;
  userId: string;
}

export interface Doa {
  id: string;
  userId: string;
  text: string;
  updatedAt: string;
  templateBackground?: string;
  ameenCount: number;
}

export interface Article {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  publishedAt: string;
}

export interface User {
  id: string;
  name: string;
  photoUrl: string;
}

export interface Quote {
  text: string;
  author: string;
}