import api from './api';
import { User } from '@/types';

// Description: Get all users (admin only)
// Endpoint: GET /api/admin/users
// Request: {}
// Response: { users: Array<{ _id: string, email: string, role: string, blocked: boolean }> }
export const getUsers = async () => {
  try {
    const response = await api.get('/api/admin/users');
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Description: Block/unblock user (admin only)
// Endpoint: POST /api/admin/users/:id/block
// Request: { blocked: boolean }
// Response: { success: boolean, message: string }
export const updateUserBlock = async (userId: string, blocked: boolean) => {
  try {
    const response = await api.post(`/api/admin/users/${userId}/block`, { blocked });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Description: Update user role (admin only)
// Endpoint: POST /api/admin/users/:id/role
// Request: { role: 'user' | 'author' | 'admin' }
// Response: { success: boolean }
export const updateUserRole = async (userId: string, role: string) => {
  try {
    const response = await api.post(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};