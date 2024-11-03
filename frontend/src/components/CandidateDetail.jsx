import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCandidateDetail } from '../utils/api'; // Create this API function

const CandidateDetail = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      const loadCandidateDetail = async () => {
        try {
          const data = await fetchCandidateDetail(candidateId);
          setCandidate(data);
        } catch (error) {
          console.error('Error fetching candidate details:', error);
        }
      };

      loadCandidateDetail();
    }
  }, [candidateId, navigate]);

  if (!candidate) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Candidate: {candidate.candidateName}
      </h2>

      {candidate.answers.map((answer, index) => (
        <div
          key={index}
          className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
        >
          <p className="font-semibold text-lg mb-2 text-purple-700">Question {index + 1}:</p>
          <p className="mb-4 text-gray-700">{answer.questionText}</p>

          <div className="mb-3">
            <p className="font-semibold text-gray-800">Options:</p>
            <ul className="list-disc list-inside ml-4 text-gray-600">
              {answer.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          </div>

          <p className="mb-2">
            <span className="font-semibold text-gray-800">User Answer: </span>
            <span className="text-gray-700">{answer.userAnswer}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold text-gray-800">Correct Answer: </span>
            <span className="text-gray-700">{answer.correctAnswer}</span>
          </p>

          <p className="mt-4">
            <span
              className={`font-bold px-2 py-1 rounded-full ${
                answer.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}
            >
              {answer.isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CandidateDetail;
