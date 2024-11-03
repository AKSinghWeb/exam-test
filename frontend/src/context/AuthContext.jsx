import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(null);
  const [candidateToken, setCandidateToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if tokens are present in localStorage on page load
    const savedAdminToken = localStorage.getItem('adminToken');
    const savedCandidateToken = localStorage.getItem('candidateToken');

    if (savedAdminToken) {
      setAdminToken(savedAdminToken);
    }

    if (savedCandidateToken) {
      setCandidateToken(savedCandidateToken);
    }
  }, []);

  // Login function for admin
  const loginAdmin = (token) => {
    localStorage.setItem('adminToken', token);
    setAdminToken(token);
    navigate('/admin/dashboard'); // Redirect to admin dashboard after login
  };

  // Login function for candidate
  const loginCandidate = (token) => {
    localStorage.setItem('candidateToken', token);
    setCandidateToken(token);
    navigate('/questions'); // Redirect to questions page after login
  };

  // Logout function for admin
  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    navigate('/admin/login');
  };

  // Logout function for candidate
  const logoutCandidate = () => {
    localStorage.removeItem('candidateToken');
    setCandidateToken(null);
    navigate('/');
  };

  // Context value that will be available to all components
  const value = {
    adminToken,
    candidateToken,
    loginAdmin,
    loginCandidate,
    logoutAdmin,
    logoutCandidate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => React.useContext(AuthContext);
