import { useNavigate } from "react-router-dom";

export const Thanks = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-blue-500 to-green-100">
            <div className="bg-white p-12 rounded-2xl shadow-lg max-w-lg text-center">
                <h1 className="text-4xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-700">
                    🎉 Thank You!
                </h1>
                <p className="text-gray-700 font-mono mb-6 text-lg">
                    Your submission was successful. We truly appreciate your time and effort.
                </p>
                <button
                    className=" transform transition-all hover:scale-105 duration-300 bg-gradient-to-r from-blue-700 to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition duration-300 ease-in-out"
                    onClick={handleGoBack}
                >
                    Return to Home.
                </button>
            </div>
        </div>
    );
};
