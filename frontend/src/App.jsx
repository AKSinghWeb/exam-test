import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageQuestions from './components/ManageQuestions';
import ManageCandidates from './components/ManageCandidates';
import CandidateLogin from './components/CandidateLogin';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import Welcome from './components/Welcome';
import CandidateDetail from './components/CandidateDetail';
import { Thanks } from './components/Thanks';

function App() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Block right-click menu
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault(); // Block Ctrl+Shift+I
        alert("Please Concentrate in your Test!!!. Access to developer tools is disabled on this site."); // Optional: alert the user
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateLogin />} />
        <Route path="/questions" element={<Questionnaire />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/admin/candidates" element={<ManageCandidates />} />
        <Route path="/admin/results" element={<Results />} />
        <Route path="/results/:candidateId" element={<CandidateDetail />} />
        <Route path="/thank-you" element={<Thanks />} />
      </Routes>
    </Router>
  );
}

export default App;
