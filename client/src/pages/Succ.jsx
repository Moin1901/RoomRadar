import React from "react";

const Succ = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-400">
      <div className="text-white text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 mb-4 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-2">Booking Successful!</h1>
        <p>Your room is booked. Thank you for choosing our service.</p>
        <button
          className="mt-4 bg-white text-green-400 px-4 py-2 rounded"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Succ;
