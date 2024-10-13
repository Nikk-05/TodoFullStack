import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import todoIcon from '../asset/todoIcon.svg'; // Import your logo image

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-indigo-400 text-white px-6 py-4 shadow-lg flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <img src={todoIcon} alt="To-Do Logo" className="h-10 w-10 rounded-full" />
      </div>
      <h1 className="text-2xl font-bold">To-Do List</h1>

      {/* User Icon and Dropdown */}
      <div className="relative">
        <FaUserCircle
          className="text-3xl cursor-pointer hover:text-gray-200"
          onClick={handleUserIconClick}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-md rounded-md">
            <button
              onClick={() => alert('Signing out...')}
              className="block w-full px-4 py-2 text-left hover:bg-indigo-500 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
