import React from 'react';

const EmptyState = ({ message = "No data available", className = "" }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${className}`}>
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 mx-auto mb-4 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-500">It seems there's nothing here.</p>
      </div>
    </div>
  );
};

export default EmptyState;
