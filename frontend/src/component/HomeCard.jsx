// src/components/Card.js
import React from 'react';

const HomeCard = ({ header, data, handleEditClick }) => {

    return (
        <div className="max-w-sm min-w-80 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">{header}</h2>
            </div>
            <div className="p-4">
                <div key={'List Price'} className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">List Price:</span>
                    <span className="text-gray-800">{data.list_price}</span>
                </div>
                <div key={'State'} className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">State:</span>
                    <span className="text-gray-800">{data.state}</span>
                </div>
                <div key={'Zip'} className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">Zip:</span>
                    <span className="text-gray-800">{data.zip}</span>
                </div>
                <div key={'Sqft'} className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">Sqft:</span>
                    <span className="text-gray-800">{data.sqft}</span>
                </div>
                <div key={'Beds'} className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">Beds:</span>
                    <span className="text-gray-800">{data.beds}</span>
                </div>
                <div key={'Baths'} className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">Baths:</span>
                    <span className="text-gray-800">{data.baths}</span>
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 text-center">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleEditClick}
                >
                    Edit user
                </button>
            </div>
        </div>
    );
};

export default HomeCard;
