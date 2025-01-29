import React from 'react';
import categoriesData from 'data/popularCategories-data.json';
import { UiElements } from 'components';

const { Cards, Carousel } = UiElements;

const PopularCategories = () => {
  return (
   
      <section>
        <h2 className="font-semibold text-[16px] md:text-xl leading-6 md:leading-[30px]">
          Popular Categories
        </h2>
        <Carousel
          data={categoriesData}
          ChildComponent={Cards.CategoryCard}
          childToShow={8}
          mob_res={4}
          arrowStyle="version2"
        />
      </section>
    
  );
};

export default PopularCategories;
