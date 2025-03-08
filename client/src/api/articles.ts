import api from './api';
import { Article } from '@/types';

// Store for mock articles
let mockArticles = [
  {
    _id: '1',
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces. It lets you create reusable UI components that manage their own state.',
    author: { _id: '1', email: 'author@example.com' },
    createdAt: '2024-03-20T10:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Understanding TypeScript',
    content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    author: { _id: '2', email: 'author2@example.com' },
    createdAt: '2024-03-19T15:30:00.000Z'
  },
  {
    _id: '3',
    title: 'The Power of Tailwind CSS',
    content: 'Tailwind CSS is a utility-first CSS framework that can be composed to build any design, directly in your markup.',
    author: { _id: '3', email: 'author3@example.com' },
    createdAt: '2024-03-18T09:15:00.000Z'
  }
];

// Description: Get all published articles
// Endpoint: GET /api/articles
// Request: {}
// Response: { articles: Array<{ _id: string, title: string, content: string, author: { _id: string, email: string }, createdAt: string }> }
export const getArticles = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ articles: mockArticles });
    }, 500);
  });
};

// Description: Create a new article
// Endpoint: POST /api/articles
// Request: { title: string, content: string }
// Response: { article: { _id: string, title: string, content: string, author: { _id: string, email: string }, createdAt: string } }
export const createArticle = async (data: { title: string; content: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArticle = {
        _id: Math.random().toString(36).substr(2, 9),
        ...data,
        author: { _id: '1', email: 'author@example.com' },
        createdAt: new Date().toISOString()
      };
      mockArticles = [newArticle, ...mockArticles];
      resolve({ article: newArticle });
    }, 500);
  });
};