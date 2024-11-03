import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { FaUserFriends,FaQuestionCircle,FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login'); // Redirect to login if not authenticated
      }
    };
    checkAuth();
  }, [navigate, BASE_API_URL]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove the token
    navigate('/admin/login'); // Redirect to the login page
  };

  return (

    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
  <main className="max-w-7xl mx-auto p-8">
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-4xl font-serif font-bold text-purple-800 mb-4">Welcome, Admin!</h2>
      <p className="text-gray-700 font-mono mb-6">
        Empowering progress through knowledge and collaboration.
      </p>
      <p className="text-gray-600 font-serif mb-6">
        Manage the platform effortlessly. Use the quick links below to navigate through questions, candidates, and results.
      </p>
    </div>

    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
        <h3 className="flex text-2xl font-semibold font-serif text-purple-600 mb-2"> <FaQuestionCircle className="text-purple-600 mr-2" size={24} />Manage Questions</h3>
        <p className="text-gray-500 font-mono mb-4">
          Questions are the keys to unlocking potential.
        </p>
        <Link 
          to="/admin/questions" 
          className="text-blue-600 hover:text-blue-700 transition-all duration-300 font-medium"
        >
          Go to Questions
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      
      <h3 className="text-2xl flex font-semibold font-serif text-purple-600 mb-2"><FaUserFriends className="text-purple-600 mr-2" size={24}/> Manage Candidates</h3>
        <p className="text-gray-500 font-mono mb-4">
          Every candidate is a story waiting to be told.
        </p>
        <Link 
          to="/admin/candidates" 
          className="text-blue-600 hover:text-blue-700 transition-all duration-300 font-medium"
        >
          Go to Candidates
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
        <h3 className="flex text-2xl font-semibold font-serif text-purple-600 mb-2"><FaChartBar className="text-purple-600 mr-2" size={24} />View Results</h3>
        <p className="text-gray-500 font-mono mb-4">
          Results are not just numbers; they're reflections of effort.
        </p>
        <Link 
          to="/admin/results" 
          className="text-blue-600 hover:text-blue-700 transition-all duration-300 font-medium"
        >
          Go to Results
        </Link>
      </div>
    </section>
  </main>
</div>
    </>
  );
};

export default AdminDashboard;
