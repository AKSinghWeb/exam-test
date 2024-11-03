import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";
import CheckTestStatus from "./CheckTestStatus";
import UseScramble from "./UseScramble";
import "./UseScramble.css";

const CandidateLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [showTestStatus, setShowTestStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const loginResponse = await axios.post(`${BASE_API_URL}/api/auth/login`, { email, password });
      const { token } = loginResponse.data;

      if (token) {
        const checkResponse = await axios.get(`${BASE_API_URL}/api/check/check`, {
          params: { email }
        });

        if (checkResponse.status === 200) {
          setShowTestStatus(true);
        } else {
          navigate("/welcome");
        }

        localStorage.setItem("candidatetoken", token);
        localStorage.setItem("candidateEmail", email);
        localStorage.setItem("candidateName", name);
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-green-100">
      <ParticleBackground />
      {showTestStatus ? (
        <CheckTestStatus email={email} />
      ) : (
        <form className="w-full max-w-3xl bg-white bg-opacity-10 shadow-lg rounded-xl px-24 pt-10 pb-8 mb-4 z-10 font-mono" onSubmit={handleSubmit}>
          {/* <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Candidate Login</h2> */}
          <div className="flex justify-center font-bold text-lg mb-6">
            <span className="gradient-text">
              <UseScramble />
            </span>

            {/* <img src="xeotec_logo.gif" className="h-16" alt="" srcset="" /> */}
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              placeholder="Enter Full Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className={`bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:scale-105'}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>

          <footer className="mt-8 text-center text-white text-sm">
            &copy; {new Date().getFullYear()} Xeotec E-Services Private Limited
          </footer>
        </form>
      )}
    </div>
  );
};

export default CandidateLogin;
