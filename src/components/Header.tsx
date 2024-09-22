import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-opacity-30 bg-black backdrop-blur-md p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">
          <span className="text-blue-400">AI</span> Business Idea Generator
        </h1>
        <nav>
          <a href="#" className="text-sm sm:text-base text-gray-300 hover:text-white transition duration-300 ease-in-out">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;