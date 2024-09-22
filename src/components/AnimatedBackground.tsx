import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute min-w-full min-h-full object-cover"
      >
        <source src="/background.webm" type="video/webm" />
        Tu navegador no soporta el tag de video.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default AnimatedBackground;