import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl mb-4">Login</h2>
      <input name="username" onChange={handleChange} placeholder="Username" className="mb-2 p-2 w-full border" />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" className="mb-2 p-2 w-full border" />
      <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded">Login</button>
    </form>
  );
}
