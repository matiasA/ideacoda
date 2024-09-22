import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 animate-gradient-x"></div>
      <div className="stars opacity-30 md:opacity-50"></div>
      <div className="stars2 opacity-20 md:opacity-30"></div>
      <div className="stars3 opacity-10 md:opacity-20"></div>
    </div>
  );
};

export default AnimatedBackground;