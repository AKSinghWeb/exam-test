import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateLogin from '../components/CandidateLogin';

const CandidateLoginPage = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Handle login success
  const handleLoginSuccess = (receivedToken) => {
    setToken(receivedToken);
    // Store the token in localStorage or sessionStorage (optional)
    localStorage.setItem('candidateToken', receivedToken);

    // Redirect the user to another page (e.g., candidate dashboard)
    navigate('/candidate-dashboard');
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6">Candidate Portal</h1>
      <CandidateLogin onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default CandidateLoginPage;
