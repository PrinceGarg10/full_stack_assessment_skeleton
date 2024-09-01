
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const users = [
    { id: '1', name: 'User 1' },
    { id: '2', name: 'User 2' },
    { id: '3', name: 'User 3' }
];

const UserHomeModel = ({ isOpen, onClose, onSave, homeId }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCheckboxChange = (id) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter(userId => userId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSave = () => {
        if (selectedUsers.length === 0) {
            setHasError(true);
            return;
        }
        setHasError(false);
        onSave(selectedUsers);
        onClose();
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Users</h3>
                {!selectedUsers.length && (
                    <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-300 rounded">
                        Please select at least one user.
                    </div>
                )}
                <div className="space-y-3">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                id={user.id}
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleCheckboxChange(user.id)}
                                className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                                htmlFor={user.id}
                                className={`text-lg ${selectedUsers.includes(user.id) ? 'font-bold' : 'font-normal'}`}
                            >
                                {user.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`py-2 px-4 rounded-md text-white ${selectedUsers.length === 0 ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
                        onClick={handleSave}
                        disabled={selectedUsers.length === 0}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default UserHomeModel;
