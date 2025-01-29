import React, { useState } from 'react';

export interface LikeButtonProps {
  initialLiked?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
        liked ? 'bg-[#FFFFFF99]  text-[#2CB1B5]' : 'bg-[#1B1B1B24] text-white'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={liked ? '#2CB1B5' : 'transparent'}
        viewBox="0 0 24 24"
        stroke={liked ? 'transparent' : 'white'}
        strokeWidth="2px"
        className="w-4 h-4"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default LikeButton;
