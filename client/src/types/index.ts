export type User = {
  _id: string;
  email: string;
  role: 'user' | 'author' | 'admin';
  blocked: boolean;
};

export type Article = {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    email: string;
  };
  createdAt: string;
};