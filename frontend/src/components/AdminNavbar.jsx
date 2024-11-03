import { useEffect,React } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove the token
    navigate('/admin/login'); // Redirect to the login page
  };

  return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-serif">
          <Link 
                to="/admin/dashboard">
                Admin Dashboard
              </Link></h1>
          <ul className="flex space-x-8 items-center">
            <li>
              <Link 
                to="/admin/questions" 
                className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-medium"
              >
                Manage Questions
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/candidates" 
                className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-medium"
              >
                Manage Candidates
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/results" 
                className="text-gray-700 hover:text-blue-500 transition-all duration-300 font-medium"
              >
                View Results
              </Link>
            </li>
            {/* Logout Button */}
            <li>
              <button 
                onClick={handleLogout} 
                className="text-red-600 hover:text-red-800 transition-all duration-300 font-medium"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default AdminNavbar;
