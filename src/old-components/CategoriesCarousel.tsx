import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel/carousel';
import imageMap from '../pages/Home/ImageImports';
// Adjust the path as needed

interface Category {
  image_url: string;
  text: string;
}

interface CategoriesCarouselProps {
  categoriesData: Category[];
}

const CategoryCard: React.FC<Category> = ({ image_url, text }) => {
  const importedSrc = imageMap[image_url];
  return (
    <CarouselItem>
      <div className="w-[88px] h-[88px] md:h-120 md:w-120 flex flex-col justify-center items-center">
        <div className="bg-[#DEFEFF] rounded-full flex justify-center items-center w-100 h-100">
          <img
            src={importedSrc}
            alt={text}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="text-wrap w-[88px] md:w-[110px] h-[20%]">
        <p className="text-xs leading-[18px] font-normal md:text-sm md:leading-[21px] md:font-semibold flex text-center text-[#1B1B1B]">
          {text}
        </p>
      </div>
    </CarouselItem>
  );
};

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  categoriesData,
}) => {
  return (
    <div className="w-full flex justify-center mb-3">
      <Carousel className="w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-xl leading-[30px] hidden md:block">
            Popular Categories
          </h1>
          <div className="flex space-x-2">
            <CarouselPrevious className="rounded-full hidden md:inline-flex" />
            <CarouselNext className="rounded-full hidden md:inline-flex" />
          </div>
        </div>
        <CarouselContent className="flex">
          {categoriesData.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
