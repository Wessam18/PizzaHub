import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input 
        type="text" 
        placeholder="Search By Name, Email, or Number" 
        className="p-2 pl-10 border border-gray-300 rounded-md w-96" // Adjust size as needed
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchBar;
