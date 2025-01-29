import { useState } from 'react';
import ProductCard from './ProductCard';
import './style.scss';
import { CustomDropDown } from '../../components/CustomDropDown/CustomDropDown';
import Breadcrumb from '../../components/CustomBreadCrumb/BreadCrumb';
import ExpansionPanel from '../../components/CustomAccordion/CustomAccordion';
import RootLayout from '../../layouts/RootLayout';

const ProductCategoriesPage = () => {
  const [categoryState, setCategoryState] = useState(false);

  const handleSubmit = () => {
    alert('Form submitted!');
  };

  const postProductClick = () => {
    setCategoryState(true);
  };

  const productCarosuel = [
    'Popular Bikes in your location',
    'Popular Cars in your location',
    'Popular Items in your location',
    'Popular Items in your location',
  ];

  const filterOptions = [
    {
      label: 'Newest to oldest',
      onSelect: () => console.log('Newest to oldest!'),
    },
    {
      label: 'High to low',
      onSelect: () => console.log('High to low!'),
    },
  ];

  return (
    <>
      <RootLayout>
        <div className="breadcrumb-wrapper">
          <Breadcrumb></Breadcrumb>
        </div>

        <div className="main mb-5 mt-5">
          <div className="left">
            <div className="accordion-wrapper">
              <div className="accordion-title">Filters</div>
              <ExpansionPanel />
            </div>

            <div className="ads">
              <img src="/ProductCategory/ads-image.png" />
            </div>
          </div>
          <div className="right">
            <div className="filter-container">
              <div className="category-title">Furniture</div>

              <CustomDropDown
                DefaultName="Newest to oldest"
                options={filterOptions}
                icon={undefined}
                className={
                  'border-[#cccbcb] text-[#767676] inline-flex items-center w-auto h-44 pl-20 h-dropdown mt-1 filter-dropdown'
                }
              />
            </div>

            <div className="product-list">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => {
                return <ProductCard></ProductCard>;
              })}
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default ProductCategoriesPage;
