import React from 'react';

interface HeaderProps {
  onNewIdea: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewIdea }) => {
  return (
    <header className="p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">AI Business Idea Generator</h1>
        <nav>
          <button
            onClick={onNewIdea}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mr-4"
          >
            Nueva Idea
          </button>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;