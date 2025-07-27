import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AddStoryForm: React.FC = () => {
  const { token, user } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', image: '', category: '', region: '', author: '', readTime: '', link: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!user) return <div className="text-center text-gray-500">Please log in to add a story.</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:4000/api/featured-stories', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Story added!');
      setForm({ title: '', description: '', image: '', category: '', region: '', author: '', readTime: '', link: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add story');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Add New Story</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 border rounded" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border rounded" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full px-3 py-2 border rounded" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full px-3 py-2 border rounded" />
      <input name="region" value={form.region} onChange={handleChange} placeholder="Region" className="w-full px-3 py-2 border rounded" />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="w-full px-3 py-2 border rounded" />
      <input name="readTime" value={form.readTime} onChange={handleChange} placeholder="Read Time (e.g. 5 min read)" className="w-full px-3 py-2 border rounded" />
      <input name="link" value={form.link} onChange={handleChange} placeholder="Official Link" className="w-full px-3 py-2 border rounded" />
      <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">Add Story</button>
      {success && <div className="text-green-600 text-center">{success}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  );
};

export default AddStoryForm; 