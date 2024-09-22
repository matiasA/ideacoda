import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-opacity-30 bg-black backdrop-blur-md p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          © 2023 AI Business Idea Generator. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out mx-2">Privacy Policy</a>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;