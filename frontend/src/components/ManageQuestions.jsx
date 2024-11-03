import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions, addQuestion, updateQuestion, deleteQuestion, addSet, fetchQuestionSets } from '../utils/api';
import AdminNavbar from './AdminNavbar';

const ManageQuestions = () => {
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newSetName, setNewSetName] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [editMode, setEditMode] = useState(null); // For tracking which question is being edited

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchQuestionSets().then(setSets);
    }
  }, [navigate]);

  const handleSelectSet = (setId) => {
    setSelectedSet(setId);
    fetchQuestions(setId).then(setQuestions);
  };

  const handleAddSet = () => {
    if (newSetName.trim()) {
      addSet({ name: newSetName }).then((newSet) => {
        setSets([...sets, newSet]);
        setNewSetName('');
      });
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleDeleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
    if (correctAnswer === options[index]) {
      setCorrectAnswer('');
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    const questionData = {
      questionText: newQuestion,
      options,
      correctAnswer,
      setId: selectedSet,
    };

    addQuestion(questionData).then(() => {
      setQuestions([...questions, questionData]);
      setNewQuestion('');
      setOptions(['']);
      setCorrectAnswer('');
    });
  };

  const handleDeleteQuestion = (id) => {
    deleteQuestion(id).then(() => {
      setQuestions(questions.filter((question) => question._id !== id));
    });
  };

  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find((q) => q._id === id);
    setNewQuestion(questionToEdit.questionText);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    setEditMode(id);
  };

  const handleSaveEdit = (id) => {
    const updatedData = {
      questionText: newQuestion,
      options,
      correctAnswer,
    };
    
    updateQuestion(id, updatedData).then(() => {
      const updatedQuestions = questions.map((q) =>
        q._id === id ? { ...q, ...updatedData } : q
      );
      setQuestions(updatedQuestions);
      setNewQuestion('');
      setOptions(['']);
      setCorrectAnswer('');
      setEditMode(null); // Exit edit mode
    });
  };

  return (
    <>
    <AdminNavbar/>
    <div className="max-w-4xl my-5 mx-auto p-8 rounded-lg shadow-md">
      <h2 className="text-4xl text-center font-mono text-gray-800 mb-8">Manage Questions</h2>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Select a Set:</label>
        <select
          onChange={(e) => handleSelectSet(e.target.value)}
          value={selectedSet || ''}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select a set</option>
          {sets.map((set) => (
            <option key={set._id} value={set._id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={newSetName}
          onChange={(e) => setNewSetName(e.target.value)}
          placeholder="New Set Name"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleAddSet}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Create Set
        </button>
      </div>

      {selectedSet && (
        <div className="mb-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Add a New Question</h3>

            <div className="mb-4">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter question"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Options:</label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleDeleteOption(index)}
                    className="ml-3 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Option
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Correct Answer:</label>
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select correct answer</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddQuestion}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Question
            </button>
          </div>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Questions in Set</h3>

          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={question._id} className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                {editMode === question._id ? (
                  <>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options:</label>
                      {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <button
                            onClick={() => handleDeleteOption(index)}
                            className="ml-3 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddOption}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add Option
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Correct Answer:</label>
                      <select
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select correct answer</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleSaveEdit(question._id)}
                        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-semibold mb-2">{index + 1}. {question.questionText}</h4>
                    <div className="mb-2">
                      <h5 className="font-semibold text-gray-700">Options:</h5>
                      <ul className="list-disc ml-5">
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="mt-1 text-gray-800">
                            {option}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-2">
                      <h5 className="font-semibold text-gray-700">Correct Answer:</h5>
                      <p>{question.correctAnswer}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditQuestion(question._id)}
                        className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question._id)}
                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>


        </div>
      )}
    </div>
    </>
  );
};

export default ManageQuestions;
