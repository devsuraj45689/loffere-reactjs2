import React, { useEffect, useState } from 'react';
import jobData from 'data/jobOpening-data.json';
import productsData from 'data/product-data.json';
import { UiElements } from 'components';
import carData from 'data/car-data.json';
import bikeData from 'data/bike.data.json';
import machineData from 'data/machine-data.json';
import mobileData from 'data/mobile-data.json';
import furnitureData from 'data/furniture-data.json';
import jwelleryData from 'data/jwellery-data.json';
import monitorData from 'data/monitor-data.json';
const { Carousel, Icons, Cards } = UiElements;
const { JobCard, ProductCard } = Cards;
const { RightArrow } = Icons.ArrowIcons;

const subSections = [
  {
    heading: 'Popular Cars & Trucks in your location',
    data: carData,
    ChildComponent: ProductCard,
    index: 1,
  },
  {
    heading: 'Popular Motorcycles in your location',
    data: bikeData,
    ChildComponent: ProductCard,
    index: 2,
  },
  {
    heading: 'Popular Appliances in your location',
    data: monitorData,
    ChildComponent: ProductCard,
    index: 3,
  },
  {
    heading: 'Popular Cell Phones & Accessories in your location',
    data: mobileData,
    ChildComponent: ProductCard,
    index: 4,
  },
  {
    heading: 'Popular Jewellery & Accessories in your location',
    data: furnitureData,
    ChildComponent: ProductCard,
    index: 5,
  },
  {
    heading: 'Popular Tools & Machinery in your location',
    data: jwelleryData,
    ChildComponent: ProductCard,
    index: 6,
  },
  {
    heading: 'Popular Tools & Machinery in your location',
    data: machineData,
    ChildComponent: ProductCard,
    index: 7,
  },
  {
    heading: 'Job offers',
    data: jobData,
    ChildComponent: JobCard,
    index: 8,
    mob_res: 1.2,
  },
];

const Products = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [childToShow, setChildToShow] = useState(screenWidth > 1399 ? 5 : 4);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setScreenWidth(currentWidth);
      setChildToShow(currentWidth > 1399 ? 5 : 4);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (

    <section>
      {subSections.map(
        ({ heading, data, ChildComponent, index, mob_res }) => (
          <div key={index} className="mt-[30px] md:mt-10">
            <div className="flex justify-between items-center gap-2">
              <h2 className="font-semibold text-[#1B1B1B] text-[20px] md:text-xl leading-6 md:leading-[30px] truncate whitespace-nowrap overflow-hidden w-[310px] md:w-auto">
                {heading}
              </h2>


              <div className="flex gap-2 items-center cursor-pointer">
                <span className="text-[#2CB1B5] font-semibold text-[16px] md:text-xl leading-6 w-[63px] sm:w-[80px] md:leading-[30px]">
                  View All
                </span>
                <RightArrow />
              </div>
            </div>
            <div className="mt-4 md:mt-[30px] text-[#1B1B1B]">
              <Carousel
                data={data}
                ChildComponent={ChildComponent}
                childToShow={childToShow}
                mob_res={mob_res}
              />
            </div>
          </div>
        )
      )}
    </section>

  );
};

export default Products;
