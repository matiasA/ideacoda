import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-opacity-30 bg-black backdrop-blur-md p-4 md:p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-400 text-sm md:text-base">
          © 2023 AI Business Idea Generator. All rights reserved.
        </p>
        <div className="mt-2 space-x-2 md:space-x-4">
          <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-sm md:text-base">Privacy Policy</a>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out text-sm md:text-base">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;