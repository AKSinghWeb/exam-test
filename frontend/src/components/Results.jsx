import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCandidateResults } from '../utils/api';
import Loader from './Loader';
import AdminNavbar from './AdminNavbar';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      const loadResults = async () => {
        setLoading(true);
        try {
          const resultsData = await fetchCandidateResults();
          setResults(resultsData);
        } catch (error) {
          console.error('Error fetching results:', error);
        } finally {
          setLoading(false);
        }
      };

      loadResults();
    }
  }, [navigate]);

  const handleRowClick = (candidateId) => {
    navigate(`/results/${candidateId}`);
  };

  const downloadCSV = () => {
    // Prepare CSV content
    const headers = ['Candidate Name', 'Email', 'Total Questions', 'Questions Attempted', 'Score'];
    const rows = results.map(result => [
      result.candidateName,
      result.email,
      result.totalQuestions || 'N/A', // Use 'N/A' if total questions is not available
      result.questionsAttempted,
      result.score,
    ]);

    // Convert array to CSV format
    const csvContent = [
      headers.join(','), // Add headers
      ...rows.map(row => row.join(',')) // Add rows
    ].join('\n');

    // Create a blob and trigger the download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'candidate_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-6xl my-5 mx-auto p-8 rounded-lg shadow-md">
        {loading && <Loader />}
        <h2 className="text-4xl text-gray-800 mb-6 text-center font-mono">Candidate Results</h2>

        {results.length === 0 && !loading ? (
          <p className="text-gray-600 text-center">No results found.</p>
        ) : (
          <>
            <button
              onClick={downloadCSV}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Download CSV
            </button>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-purple-500 text-white font-mono">
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Candidate Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Total Questions</th> {/* New column */}
                  <th className="py-3 px-4 text-left">Score</th>
                  <th className="py-3 px-4 text-left">Questions Attempted</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr
                    key={result._id}
                    className="border-b hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(result._id)}
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">{index + 1}</td>
                    <td className="py-3 px-4">{result.candidateName}</td>
                    <td className="py-3 px-4">{result.email}</td>
                    <td className="py-3 px-4">{result.totalQuestions || 'N/A'}</td> {/* Display total questions */}
                    <td className="py-3 px-4">{result.score}</td>
                    <td className="py-3 px-4">{result.questionsAttempted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Results;
