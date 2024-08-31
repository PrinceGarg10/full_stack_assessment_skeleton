import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useGetAllUserQuery } from '../services/apislice';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import EmptyState from './EmptyState';
import ErrorDisplay from './Error';


const Header = () => {
    const { data, error, isLoading } = useGetAllUserQuery();

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.selectedUser.user);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelectUser = (user) => {
        dispatch(setUser(user));
        setIsOpen(false);
    };
    console.log({ error });

    return (
        <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200 w-full">
            <h1 className="text-xl font-semibold">My App</h1>
            {
                isLoading ? <div className='w-40'> <Skeleton count={2} /></div> :
                    error ? <ErrorDisplay error={error.error} />
                        :
                        <div className="relative">
                            <button
                                className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700 flex items-center focus:outline-none"
                                onClick={toggleDropdown}
                            >
                                <span className="mr-2">{selectedUser ? selectedUser.username : 'Select User'}</span>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-64 pl-3 max-h-60 overflow-y-auto">
                                    {data ? data.map((user) => (
                                        <div
                                            key={user.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-l-2 border-l-black mt-2 mb-1 rounded-l-md"
                                            onClick={() => handleSelectUser(user)}
                                        >
                                            <div className="font-semibold text-left">{user.username}</div>
                                            <div className="text-sm text-gray-600 text-left">{user.email}</div>
                                        </div>
                                    )) : <EmptyState />}
                                </div>
                            )}
                        </div>
            }
        </header>
    );
};

export default Header;
