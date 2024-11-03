import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { fetchCandidates, addCandidate, assignQuestionSet, fetchQuestionSets, deleteCandidate } from '../utils/api';
import AdminNavbar from './AdminNavbar';

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState('');
  const [sets, setSets] = useState([]);
  const [selectedSets, setSelectedSets] = useState({}); // Keeps track of selected sets per candidate
  const [loading, setLoading] = useState(false); // For showing loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      loadCandidatesAndSets(); // Load data on component mount
    }
  }, [navigate]);

  const loadCandidatesAndSets = async () => {
    setLoading(true); // Show loading while fetching
    try {
      const candidatesData = await fetchCandidates();
      const setsData = await fetchQuestionSets();
      
      setCandidates(candidatesData);
      setSets(setsData);

      const initialSelectedSets = {};
      candidatesData.forEach((candidate) => {
        if (candidate.questionSets && candidate.questionSets.length > 0) {
          initialSelectedSets[candidate.email] = candidate.questionSets[0].setId;
        }
      });
      setSelectedSets(initialSelectedSets);
    } catch (error) {
      console.error('Error loading candidates and sets:', error);
    }
    setLoading(false); // Hide loading
  };

  const handleAddCandidate = async () => {
    if (newCandidate.trim()) {
      try {
        const addedCandidate = await addCandidate(newCandidate);
        setCandidates([...candidates, addedCandidate]);
        setNewCandidate('');
      } catch (error) {
        console.error('Error adding candidate:', error);
      }
    }
  };

  const handleSetChange = (email, setId) => {
    setSelectedSets({
      ...selectedSets,
      [email]: setId,
    });
  };

  const handleSaveSet = async (email) => {
    const setId = selectedSets[email];
    if (email && setId) {
      try {
        await assignQuestionSet(email, setId);
        alert(`Assigned set ${setId} to ${email}`);
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.email === email
              ? { ...candidate, questionSets: [{ setId }] }
              : candidate
          )
        );
      } catch (error) {
        console.error('Error assigning question set:', error);
      }
    }
  };

  const handleDeleteCandidate = async (email) => {
    try {
      await deleteCandidate(email);
      setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.email !== email));
      alert(`Candidate ${email} has been deleted.`);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="max-w-4xl my-5 mx-auto p-8 rounded-lg shadow-md">
      <h2 className="text-4xl font-mono text-gray-800 mb-6 text-center">Manage Candidates</h2>

      <div className="mb-8">
        <input
          type="email"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          placeholder="Enter candidate email"
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAddCandidate}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Candidate
        </button>
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading candidates...</p>
      ) : (
        <ul className="space-y-4">
          {candidates.map((candidate) => (
            <li key={candidate.email} className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                <span className="text-lg font-medium text-gray-800">{candidate.email}</span>
                {candidate.questionSets && candidate.questionSets.length > 0 ? (
                  <p className="text-sm text-gray-600 mt-1">
                    Current Set: <strong>{sets.find((set) => set._id === candidate.questionSets[0].setId)?.name || 'Unknown'}</strong>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-1">No set assigned</p>
                )}
              </div>

              <div className="flex space-x-3 items-center">
                <select
                  value={selectedSets[candidate.email] || ''}
                  onChange={(e) => handleSetChange(candidate.email, e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select Set</option>
                  {sets.map((set) => (
                    <option key={set._id} value={set._id}>
                      {set.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleSaveSet(candidate.email)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDeleteCandidate(candidate.email)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default ManageCandidates;
