import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:5000/api/auth/logout', {
      credentials: 'include'
    }).then(() => navigate('/login'));
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="text-xl font-bold">Buy Sell Trade</div>
      <div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
