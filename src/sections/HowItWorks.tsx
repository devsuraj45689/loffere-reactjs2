import React from 'react';
import { Button } from 'antd';
import cardsData from 'data/how-it-work-data.json';
import { UiElements } from 'components';

const { HowWorksCard } = UiElements.Cards;

const HowItWorks = () => {
  return (
   
      <section>
        <div className="flex justify-between w-full items-center max-md:px-[10px]">
          <div className="flex flex-col md:gap-2 mb-[30px] md:mb-[60px]">
            <h2 className="md:text-[46px] md:leading-[69px] text-[32px] max-md:text-center leading-[48px] font-semibold">
              How it works
            </h2>
            <p className="md:w-[75%] mb-0 md:text-[16px] font-normal md:leading-6 text-[15px] leading-[22.5px] max-md:text-center ">
              Lorem ipsum dolor sit amet consectetur. Sed ut sed vulputate eget.
              Vitae sed dui nulla mattis dignissim consectetur egestas.
            </p>
          </div>
          <Button
            className="hidden md:inline-flex h-[48px] py-[12px] bg-[#2CB1B5] text-white hover:!text-[#2CB1B5]"
            style={{ paddingInline: '16px', borderRadius: '24px' }}
          >
            <span className="text-[16px] font-normal leading-6" style={{}}>
              Visit Help Center
            </span>
          </Button>
        </div>

        <div className="row justify-content-center max-md:px-[10px]">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 max-md:mb-[16px]">
            {cardsData.map((card: any, index: number) => (
              <HowWorksCard {...card} key={index} />
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center md:hidden pt-[14px]">
          <Button
            className="inline-flex h-[48px] py-[12px] bg-[#2CB1B5] text-white hover:!text-[#2CB1B5]"
            style={{ paddingInline: '16px', borderRadius: '24px' }}
          >
            <span className="text-[16px] font-normal leading-6" style={{}}>
              Visit Help Center
            </span>
          </Button>
        </div>
      </section>
   
  );
};

export default HowItWorks;
