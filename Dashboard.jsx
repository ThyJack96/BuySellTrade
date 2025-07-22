import { useState, useEffect } from 'react';
import Navbar from './Navbar';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/items', {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/items/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    });
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
        <h2 className="text-xl mb-4">Add New Item</h2>
        <input name="title" onChange={handleChange} placeholder="Title" className="mb-2 p-2 w-full border" />
        <input name="description" onChange={handleChange} placeholder="Description" className="mb-2 p-2 w-full border" />
        <input name="price" type="number" onChange={handleChange} placeholder="Price" className="mb-2 p-2 w-full border" />
        <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded">Add Item</button>
      </form>

      <div className="max-w-2xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4">Items for Sale</h3>
        <ul>
          {items.map((item) => (
            <li key={item._id} className="border p-3 mb-2">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
