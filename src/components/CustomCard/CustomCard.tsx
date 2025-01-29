import React from 'react';
import { cn } from 'lib/utils';

interface CustomCardProps {
    image: string; // Accepts the source string for the image
    title: string;
    description: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
    image,
    title,
    description,
    isSelected = false,
    onClick,
}) => {
    return (
        <div
            className={cn(
                ' cursor-pointer w-[273px] h-[84px] rounded-2xl border  transition-all',
                isSelected
                    ? 'border-[#2CB1B5] bg-[#e6f9fa]'
                    : 'border-gray-300 bg-white hover:shadow-md'
            )}
            onClick={onClick}
        >
            {/* Render the icon inside an img tag */}
            <div className='flex justify-evenly'>
                
            <div className='text-start'>
                <h3 className="mt-3 text-sm font-medium text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className="flex h-12 w-12 rounded-full bg-[#e6f9fa]">
                <img src={image} alt={title} className="h-8 w-8" />
            </div>
            </div>
        </div>
    );
};

export default CustomCard;
