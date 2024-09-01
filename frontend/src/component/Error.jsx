import React from 'react';

const ErrorDisplay = ({ error, onRetry }) => {
    if (!error) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md text-center">
            <h3 className="text-xl font-semibold mb-2">Error</h3>
            <p className="mb-4">{error || 'An unknown error occurred.'}</p>
            <button
                onClick={onRetry}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                Retry
            </button>
        </div>
    );
};

export default ErrorDisplay;
