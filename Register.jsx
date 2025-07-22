import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    });
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <h2 className="text-2xl mb-4">Register</h2>
      <input name="username" onChange={handleChange} placeholder="Username" className="mb-2 p-2 w-full border" />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" className="mb-2 p-2 w-full border" />
      <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded">Sign Up</button>
    </form>
  );
}
