import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMapMarkerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

type UserProfileProps = {
    params?: any;
};

type User = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
    const user: User = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, Springfield, IL'
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full transition-all duration-500">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    User Profile
                </h1>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon icon={faUser} className="text-blue-400 w-6 h-6" />
                        <div className="flex-grow text-white">
                            <div className="mt-1 p-2 border-b border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:rounded-xl rounded-xl transform hover:scale-105">{user.firstName} {user.lastName}</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon icon={faEnvelope} className="text-green-400 w-6 h-6" />
                        <div className="flex-grow text-white">
                            <div className="mt-1 p-2 border-b border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:rounded-xl rounded-xl transform hover:scale-105">{user.email}</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-400 w-6 h-6" />
                        <div className="flex-grow text-white">
                            <div className="mt-1 p-2 border-b border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:rounded-xl rounded-xl transform hover:scale-105">{user.address}</div>
                        </div>
                    </div>
                </div>
                <button className="mt-8 w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300">
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
