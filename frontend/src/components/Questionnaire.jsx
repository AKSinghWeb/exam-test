import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../utils/api";
import { FaUserCircle } from "react-icons/fa";
import Loader from "../components/Loader";

const Questionnaire = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [clickedQuestions, setClickedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1080);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("candidatetoken");
    const candidateEmail = localStorage.getItem("candidateEmail");

    if (!token || !candidateEmail) {
      navigate("/");
    } else {
      const checkTestStatus = async () => {
        try {
          const statusResponse = await fetch(
            `${BASE_API_URL}/api/candidates/status?email=${candidateEmail}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const statusData = await statusResponse.json();

          if (statusData.submitted) {
            setTestSubmitted(true);
          } else {
            const setResponse = await fetch(
              `${BASE_API_URL}/api/candidates/setid?email=${candidateEmail}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const setId = (await setResponse.json()).setId;
            const questionsData = await fetchQuestions(setId);
            setQuestions(questionsData);

            const storedTime = localStorage.getItem("timerEnd");
            if (storedTime) {
              const remainingTime = Math.max(Math.floor((new Date(storedTime) - new Date()) / 1000), 0);
              setTimeLeft(remainingTime);
            } else {
              const endTime = new Date().getTime() + 1080 * 1000;
              localStorage.setItem("timerEnd", new Date(endTime).toISOString());
              setTimeLeft(1080);
            }
          }
        } catch (error) {
          console.error("Error checking test status or fetching questions", error);
        } finally {
          setLoading(false);
        }
      };

      checkTestStatus();
    }
  }, [navigate, BASE_API_URL]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleAnswerChange = (e, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    if (!clickedQuestions.includes(index)) {
      setClickedQuestions([...clickedQuestions, index]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const candidateEmail = localStorage.getItem("candidateEmail");
      const candidateName = localStorage.getItem("candidateName");
      if (!candidateName && !candidateEmail) {
        alert("No token found. Please log in again.");
        return;
      }

      await fetch(`${BASE_API_URL}/api/candidate/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, candidateEmail, candidateName }),
      });

      // alert("Test submitted successfully!");

      localStorage.removeItem("candidatetoken");
      localStorage.removeItem("candidateEmail");
      localStorage.removeItem("timerEnd");

      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting test", error);
      alert("Error submitting your test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("candidatetoken");
    localStorage.removeItem("candidateEmail");
    localStorage.removeItem("timerEnd");
    navigate("/");
  };

  const getSidebarClass = (index) => {
    if (answers[index]) {
      return "bg-green-500 text-white";
    } else if (currentQuestion === index) {
      return "bg-blue-500 text-white";
    } else if (clickedQuestions.includes(index)) {
      return "bg-red-500 text-white";
    } else {
      return "bg-white text-black";
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="flex justify-between items-center px-8 py-4 text-black">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <h1 className="ml-4 text-2xl font-semibold font-mono">Xeotec E-Services Private Limited</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-mono">Time Left: {formatTime(timeLeft)}</div>
          <FaUserCircle className="text-3xl text-blue-700" />
        </div>
      </header>
  
      <div className="flex-1 flex overflow-hidden">
        {loading ? (
          <Loader />
        ) : testSubmitted ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-2xl font-semibold">You have already submitted the test!</p>
          </div>
        ) : (
          <>
            {/* Sidebar with scroll */}
            <div className="w-1/4 p-4 overflow-y-auto border-r">
              <h2 className="font-bold font-serif text-lg mb-4">Questions</h2>
              <ul>
                {questions.map((_, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 mb-2 rounded ${getSidebarClass(index)}`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    Question {index + 1}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Main Content */}
            <div className="flex-1 p-8 overflow-hidden">
              <div className="bg-white p-6 shadow-md rounded-lg">
                {questions.length > 0 ? (
                  <>
                    <h2 className="text-xl font-bold mb-4">Question {currentQuestion + 1}</h2>
                    <p className="mb-6">{questions[currentQuestion].questionText}</p>
                    <div className="mb-4">
                      {questions[currentQuestion].options?.map((option, index) => (
                        <label key={index} className="block mb-2">
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={answers[currentQuestion] === option}
                            onChange={(e) => handleAnswerChange(e, currentQuestion)}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      {currentQuestion > 0 && (
                        <button
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                          onClick={() => setCurrentQuestion(currentQuestion - 1)}
                        >
                          Previous
                        </button>
                      )}
                      {currentQuestion < questions.length - 1 ? (
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <p>No questions found</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
  
      {/* Footer should always stay at the bottom */}
      <footer className="text-center py-4 mt-auto">
        <p>© Copyright Xeotec E-Services Private Limited</p>
      </footer>
    </div>
  );
  
};

export default Questionnaire;
