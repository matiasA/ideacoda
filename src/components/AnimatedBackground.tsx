import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 animate-gradient-slow"></div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30"></div>
    </div>
  );
};

export default AnimatedBackground;