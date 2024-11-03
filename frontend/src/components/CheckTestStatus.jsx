import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection

const CheckTestStatus = () => {
  const [timeLeft, setTimeLeft] = useState(10); // 10-second timer
  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer for redirection
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate('/', { replace: true }); // Redirect after 10 seconds
          window.location.reload(); // Refresh the page
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen z-10 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">You have already given the test.</h2>
        <p>Redirecting in {timeLeft} seconds...</p>
      </div>
    </div>
  );
};

export default CheckTestStatus;
