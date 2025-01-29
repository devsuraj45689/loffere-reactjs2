import React from 'react';
import { Carousel } from './Carousel';
import { slideList } from '../configs/Constants';

const LandingPageCarousal = () => {
  return (
    <div className="w-[100%]">
      <Carousel slides={slideList} />
    </div>
  );
};

export default LandingPageCarousal;
