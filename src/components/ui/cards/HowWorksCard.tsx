import React, { useState } from 'react';
import { Card } from 'antd';
import { DonatIcon } from 'assets/icons/CustomIcon';
import 'assets/css/HowItWorks.css';

interface HowWorksCardProps {
  title: string;
  description: string;
}

const HowWorksCard: React.FC<HowWorksCardProps> = ({ title, description }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      hoverable
      className={`border-[#2CB1B5] border-[2px] rounded-3xl ${hover ? 'hover:bg-[#2CB1B5] translate-y-[-10px]' : 'bg-white'}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transition: 'transform 0.3s, background-color 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
      }}
    >
      <div className="p-[20px] md:p-[30px] font-poppins">
        <div className="md:py-1">
          <DonatIcon fillColor={hover ? '#FFFFFF' : '#2CB1B5'} />
        </div>
        <div className="pt-[20px]">
          <h3
            className={`mb-3 text-lg font-semibold leading-[27px] ${hover ? 'text-white' : 'text-[#1B1B1B]'}`}
            style={{ transition: 'color 0.3s' }}
          >
            {title}
          </h3>
          <p
            className={`mb-0 text-[16px] font-normal leading-6 ${hover ? 'text-white' : 'text-gray-700'}`}
            style={{ transition: 'color 0.3s' }}
          >
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HowWorksCard;
