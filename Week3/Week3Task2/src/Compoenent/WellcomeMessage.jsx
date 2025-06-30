import React, { useEffect, useState } from 'react';

const WelcomeMessage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // cleanup interval on unmount
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 text-center mb-4">
        Welcome to CosmiCode!
      </h1>
      <div className="text-lg sm:text-xl text-gray-600 text-center max-w-xl space-y-2">
        <p>{currentTime.toDateString()}</p>
        <p>Time: {hours}:{minutes}:{seconds}</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
