import api from './api';

// Description: Login user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { user: { _id: string, email: string, role: string }, accessToken: string, refreshToken: string }
export const login = async (email: string, password: string) => {
  // Mocking the response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length < 8) {
        reject(new Error("Password must be at least 8 characters long"));
        return;
      }

      // Simulate blocked account
      if (email.includes('blocked')) {
        reject(new Error("Your account has been blocked. Please contact the administrator."));
        return;
      }

      // Default to 'user' role, but use 'author' or 'admin' if email contains those words
      let role = 'user';
      if (email.includes('author')) {
        role = 'author';
      } else if (email.includes('admin')) {
        role = 'admin';
      }

      resolve({
        user: { _id: Date.now().toString(), email, role },
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now()
      });
    }, 500);
  });
};

// Description: Register user
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string, role: 'user' | 'author' | 'admin' }
// Response: { success: boolean, message: string }
export const register = async (email: string, password: string, role: string) => {
  // Mocking the response
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password.length < 8) {
        reject(new Error("Password must be at least 8 characters long"));
        return;
      }
      resolve({ success: true, message: 'Registration successful' });
    }, 500);
  });
};

// Description: Logout user
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { success: boolean }
export const logout = async () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};