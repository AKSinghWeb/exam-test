import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`${BASE_API_URL}/api/admin/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem("adminToken", token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login failed", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="w-full max-w-sm shadow-lg rounded-lg px-8 pt-6 pb-8" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold font-serif text-center text-gray-700 mb-6">Admin Login</h2>
        <div className="mb-3 font-mono">
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 font-mono">
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`w-full bg-blue-500 text-white font-serif font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            type="submit"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <p className="text-center  text-xs mt-4">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
