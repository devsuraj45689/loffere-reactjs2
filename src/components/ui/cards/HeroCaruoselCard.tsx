import React from 'react';
import imageMap from '../../../pages/Home/ImageImports'; // Adjust the path as needed

interface HeroCarouselCardProps {
  name: string;
  alt: string;
  className?: string;
}

const HeroCarouselCard: React.FC<HeroCarouselCardProps> = ({
  name,
  alt,
  className = '',
}) => {
  const importedSrc = imageMap[name];

  return (
    <img
      src={importedSrc}
      alt={alt}
      className={`w-full h-full object-cover rounded-xl ${className}`}
    />
  );
};

export default HeroCarouselCard;
