import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User icon
import { format } from "date-fns";

const Welcome = () => {
  const navigate = useNavigate();
  const candidateEmail = localStorage.getItem("candidateName");
  const [loading, setLoading] = useState(false);
  const currentDate = format(new Date(), "do MMMM, yyyy");

  useEffect(() => {
    if (!candidateEmail) {
      navigate("/");
    }
  }, [candidateEmail, navigate]);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/questions");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center">
          {/* <img
            src="xeotec_logo.gif" // Replace with your logo URL
            alt="Logo"
            className="h-12"
          /> */}
          <h1 className="ml-4 text-2xl font-semibold font-mono">Xeotec E-Services Private Limited</h1>
        </div>
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-3xl text-blue-700" />
        </div>
      </header>

      <main className="flex flex-col justify-center items-center flex-grow px-8 py-16 bg-gradient-to-br from-red-100 to-gray-50">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:w-1/2 p-8 bg-blue-400 flex items-center justify-center">
            <img
              src="exam.png" // Replace with your image URL
              alt="Event"
              className="rounded-md h-72"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Recruitment Drive</h2>
            <p className="text-lg text-gray-600 mb-2">Web Developer</p>
            <p className="text-gray-600 text-sm mb-6">22nd October, 2024</p>

            <p className="text-sm text-gray-500 mb-8 font-mono">
              We are excited to have you participate in our recruitment drive. Please click "Start Test" when you are ready. Good luck!
            </p>
            <p className="text-sm text-gray-500 mb-4 font-mono">
    You have 18 minutes to complete 30 questions.
  </p>

            <button
              className={`bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-all duration-300 hover:bg-black hover:text-red-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleStart}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="4" />
                  </svg>
                  Loading...
                </div>
              ) : (
                "Start"
              )}
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center py-4">
        <p className="font-mono">© Copyright Xeotec E-Services Private Limited</p>
      </footer>
    </div>
  );
};

export default Welcome;
