import React from 'react';
import { CalenderIcon, LocationIcon } from 'assets/icons/CustomIcon';
import { LikeButton } from 'components/ui/buttons';

interface JobCardProps {
  title: string;
  location: string;
  salary: number;
  days: string;
  post: string;
  companyName: string;
  companyImage: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  location,
  salary,
  days,
  post,
  companyName,
  companyImage,
}) => {
  return (
    <div className="flex justify-between gap-1.5 md:gap-2 p-3 md:p-[20px] bg-[#F3F3F3] rounded-[12px] shadow-md">
      <div className="flex-grow">
        <h3 className="text-[15px] leading-[22.5px] md:text-lg font-semibold mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium">Salary</span>
          <div className="inline-block w-1 h-1 rounded-full bg-black mx-1" />
          <span className="text-sm font-medium">{`$${salary} / year`}</span>
        </div>

        <div className="px-3 py-1.5 rounded-[50px] bg-[#2CB1B521] text-xs font-normal leading-[18px] inline-block mb-3">
          Simplified application
        </div>

        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-[#1B1B1B24]">
            <LocationIcon sizeClass="w-4 h-4" />
          </div>
          <span className="text-sm font-normal leading-[18px] md:leading-[21px]">
            {location}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-[#1B1B1B24]">
            <CalenderIcon sizeClass="w-4 h-4" />
          </div>
          <span className="text-sm font-normal leading-[18px] md:leading-[21px]">
            {days}
          </span>
          <div className="inline-block w-1 h-1 rounded-full bg-[#2CB1B5] mx-1" />
          <span className="text-sm font-normal leading-[18px] md:leading-[21px] text-[#2CB1B5]">
            {post}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-[46px] h-[46px] rounded-full border-1 border-gray-400 overflow-hidden relative">
            <img
              src={companyImage}
              alt={companyName}
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="text-sm font-medium">{companyName}</div>
        </div>
      </div>

      <div className="flex items-start">
        <LikeButton />
      </div>
    </div>
  );
};

export default JobCard;
