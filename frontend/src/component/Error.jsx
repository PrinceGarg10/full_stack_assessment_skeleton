// ErrorDisplay.js
import React from 'react';

const ErrorDisplay = ({ error }) => {
    if (!error) return null;

    return (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px', backgroundColor: '#fdd' }}>
            <h3>Error</h3>
            <p>{error || 'An unknown error occurred.'}</p>
        </div>
    );
};

export default ErrorDisplay;
