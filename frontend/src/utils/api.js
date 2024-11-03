import axios from 'axios';

// Get the base URL from environment variables
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

// Define the API endpoints using the base URL
const QUESTIONS_API_URL = `${BASE_API_URL}/api/questions`;
const CANDIDATES_API_URL = `${BASE_API_URL}/api/candidates`;
const SETS_API_URL = `${BASE_API_URL}/api/sets`;
const RESULTS_API_URL = `${BASE_API_URL}/api/results`;

// Utility function to add token to the request headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken'); // Assumes admin token is stored in localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// --------- Questions API ---------

// Fetch all questions or questions by set ID
export const fetchQuestions = async (setId = '') => {
  try {
    const url = setId ? `${QUESTIONS_API_URL}?setId=${setId}` : QUESTIONS_API_URL;
    const response = await axios.get(url, getAuthHeaders());
    return response.data; // Returns the list of questions
  } catch (error) {
    console.error('Error fetching questions:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData) => {
  try {
    const response = await axios.post(QUESTIONS_API_URL, questionData, getAuthHeaders());
    return response.data; // Returns the newly created question
  } catch (error) {
    console.error('Error adding question:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Update a question
export const updateQuestion = async (id, updatedData) => {
  try {
    const response = await axios.put(`${QUESTIONS_API_URL}/${id}`, updatedData, getAuthHeaders());
    return response.data; // Returns the updated question
  } catch (error) {
    console.error('Error updating question:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete a question
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${QUESTIONS_API_URL}/${id}`, getAuthHeaders());
    return response.data; // Returns a success message
  } catch (error) {
    console.error('Error deleting question:', error.response?.data?.message || error.message);
    throw error;
  }
};

// --------- Sets API ---------

// Fetch all question sets
export const fetchQuestionSets = async () => {
  try {
    const response = await axios.get(SETS_API_URL, getAuthHeaders());
    return response.data; // Returns the list of question sets
  } catch (error) {
    console.error('Error fetching question sets:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Add a new question set
export const addSet = async (setData) => {
  try {
    const response = await axios.post(SETS_API_URL, setData, getAuthHeaders());
    return response.data; // Returns the newly created set
  } catch (error) {
    console.error('Error adding set:', error.response?.data?.message || error.message);
    throw error;
  }
};

// --------- Candidates API ---------

// Fetch all candidates
export const fetchCandidates = async () => {
  try {
    const response = await axios.get(CANDIDATES_API_URL, getAuthHeaders());
    return response.data; // Returns the list of candidates
  } catch (error) {
    console.error('Error fetching candidates:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Add a new candidate
export const addCandidate = async (candidateEmail) => {
  try {
    const response = await axios.post(CANDIDATES_API_URL, { email: candidateEmail }, getAuthHeaders());
    return response.data; // Returns the newly added candidate
  } catch (error) {
    console.error('Error adding candidate:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete a candidate
export const deleteCandidate = async (email) => {
  try {
    const response = await axios.delete(`${CANDIDATES_API_URL}/${email}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error deleting candidate:', error.response?.data?.message || error.message);
    throw error;
  }
};


// Assign a question set to a candidate
export const assignQuestionSet = async (email, setId) => {
  try {
    const response = await axios.post(`${CANDIDATES_API_URL}/assign-set`, { email, setId }, getAuthHeaders());
    return response.data; // Returns a success message
  } catch (error) {
    console.error('Error assigning question set:', error.response?.data?.message || error.message);
    throw error;
  }
};

// --------- Results API ---------

// Fetch candidate results
export const fetchCandidateResults = async () => {
  try {
    const response = await axios.get(RESULTS_API_URL, getAuthHeaders());
    return response.data; // Returns the results data
  } catch (error) {
    console.error('Error fetching candidate results:', error.response?.data?.message || error.message);
    throw error;
  }
};


// utils/api.js
export const fetchCandidateDetail = async (candidateId) => {
  const response = await fetch(`${RESULTS_API_URL}/${candidateId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch candidate detail');
  }
  return response.json();
};
