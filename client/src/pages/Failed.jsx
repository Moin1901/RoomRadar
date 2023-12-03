import React from "react";

const Failed = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-red-500">
          Transaction Failed
        </h2>
        <p className="text-gray-700 mb-4">
          Your room booking was unsuccessful.
        </p>
        <p className="text-gray-700 mb-4">Please try again later.</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default Failed;
