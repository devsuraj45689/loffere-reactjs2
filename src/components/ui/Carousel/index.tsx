import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'antd';
import { Icons } from 'components/ui';
import './style.scss';

const { NextArrow, PrevArrow } = Icons.ArrowIcons;

interface ReusableCarouselProps {
  arrows?: boolean;
  dots?: boolean;
  data: any[];
  ChildComponent: React.FC<any>;
  childToShow?: number;
  mob_res?: number;
  arrowStyle?: string;
}

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
  arrows = true,
  dots = false,
  data,
  ChildComponent,
  childToShow,
  mob_res = 2,
  arrowStyle,
}) => {
  const carouselRef = useRef<any>(null);
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const settings = {
    arrows: arrows,
    slidesToShow: childToShow,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: false,
    dots: dots,
    ref: carouselRef,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: mob_res,
          infinite: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Carousel
        {...settings}
        className={`w-full ${arrows ? 'overflow-hidden' : ''}`}
      >
        {data.map((item, index) => (
          <div key={index}>
            <ChildComponent {...item} />
          </div>
        ))}
      </Carousel>
      {arrows ? (
        <div className="hidden md:block">
          <PrevArrow
            onClick={handlePrev}
            className={` ${arrowStyle ? 'right-3 !-top-6' : 'left-0'}`}
          />
          <NextArrow
            onClick={handleNext}
            className={`right-0 ${arrowStyle ? '!-top-6' : ''}`}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReusableCarousel;
