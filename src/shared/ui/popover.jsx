'use client';
import { useState } from 'react';

const Popover = ({ button, content }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative">
      <button
        // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
        className="items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {button}
      </button>
      {isHovered && (
        <div className="bg-opacity-90 absolute right-1 z-40 mt-2 w-48 rounded-lg border border-gray-300 bg-gray-300 shadow-lg">
          <div className="p-2 text-sm text-black">{content}</div>
        </div>
      )}
    </div>
  );
};

export default Popover;
