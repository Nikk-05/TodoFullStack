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
      </div>
    </nav>
  );
}

export default Navbar;
