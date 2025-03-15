import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!user ? (
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to Our Blog Platform</h1>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Choose how you want to join:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/register"
                  className="block p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Reader</h3>
                  <p className="text-sm text-blue-600">Read and interact with posts from our authors</p>
                </Link>
                <Link
                  to={{
                    pathname: "/register",
                    search: "?role=author"
                  }}
                  className="block p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Author</h3>
                  <p className="text-sm text-green-600">Create and publish your own posts</p>
                </Link>
                <Link
                  to={{
                    pathname: "/register",
                    search: "?role=admin"
                  }}
                  className="block p-6 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition"
                >
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">Admin</h3>
                  <p className="text-sm text-purple-600">Manage users and content</p>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">Already have an account?</p>
              <Link
                to="/login"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome back, {user.username}!</h1>
            <p className="text-gray-600">
              You are logged in as: <span className="font-semibold">{user.role}</span>
            </p>
          </div>
          
          {user.role === 'author' && (
            <div className="text-center mb-8">
              <Link
                to="/create-post"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
              >
                Create New Post
              </Link>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            {loading ? (
              <p className="text-center text-gray-600">Loading posts...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-600">No posts available.</p>
            ) : (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <div key={post._id} className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.content.substring(0, 200)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">By: {post.author?.username || 'Unknown'}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 