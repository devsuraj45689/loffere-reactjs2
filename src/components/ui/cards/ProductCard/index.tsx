import React from 'react';
import { Card } from 'antd';
import { LocationIcon, RatingIcon } from 'assets/icons/CustomIcon';
import { LikeButton } from 'components/ui/buttons';
import './style.scss';

interface ProductCardProps {
  image: string;
  productType: string;
  title: string;
  location: string;
  rating: number;
  sellerImage: string;
  seller: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  productType,
  title,
  location,
  rating,
  sellerImage,
  seller,
  price,
}) => {
  return (
    <Card
      className="w-[192px] h-[368px] sm:h-[472px] sm:w-[244px] md:rounded-[16px] p-[10px] bg-[#F3F3F3] font-poppins cursor-pointer duration-300 ease-in-out"
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = '0px 0px 20px rgba(128, 128, 128, 0.3)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = '0px 0px 10px rgba(128, 128, 128, 0.2)')
      }
      cover={
        <div
          className="relative overflow-hidden w-[180px] h-[220px] sm:w-[212px] sm:h-[260px]"
          style={{ paddingBottom: '55.56%', borderRadius: '6px' }}
        >
          <div className="absolute top-0 left-0 sm:w-[224px] sm:h-[260px] w-[180px] h-[220px]">
            <img alt="product" src={image} className="w-[244px]" />
          </div>
          <div className="absolute top-[10px] right-[10px]">
            <LikeButton />
          </div>
        </div>
      }
    >
      <div className=" md:pt-3 md:px-1 md:pb-2">
        <p className="text-xs md:text-sm md:leading-[21px] font-normal text-[#1B1B1B] md:mb-[7px] mb-[2px]">
          {productType}
        </p>
        <h3 className="text-[14px] font-medium leading-[21px] md:text-[18px] md:leading-[27px] text-black md:mb-[7px] line-clamp-2">
          {title}
        </h3>


        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[3px] md:gap-[6px]">
            <div className="w-4 h-4 md:w-6 md:h-6 rounded-full text-[8px] bg-[#1B1B1B24] flex justify-center items-center">
              <LocationIcon sizeClass="w-[8px] h-[9px] md:w-[14px] md:h-4" />
            </div>
            <div
              className="font-medium text-[10px] leading-[15px] md:font-normal md:text-xs md:leading-[18px] text-[#1B1B1B] truncate"
              style={{
                display: 'inline-block',
                maxWidth: '13ch', 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {location}
            </div>

          </div>



          {/* &#40; 5 <span className='hidden md:inline-block'>Reviews</span> &#41; */}
          <div className="text-sm font-semibold leading-[21px] md:text-[16px] md:leading-[33px] text-[#2CB1B5]">
            {price} Dh
          </div>

        </div>
        <div className="w-full border mt-[7px] mb-[7px] md:mt-3 md:mb-3" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[3px] md:gap-[6px]">
            <div className="w-[20px] h-[20px] md:w-8 md:h-8 rounded-full overflow-hidden relative">
              <img
                src={sellerImage}
                alt={seller}
                className="absolute w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xs leading-[18px] md:text-sm md:leading-[21px] font-medium mb-0 text-[#1B1B1B]">
              {seller}
            </h4>
          </div>
          <div className="flex items-center gap-[3px] md:gap-[6px]">
            <div className=" flex justify-center items-center">
              <RatingIcon sizeClass="w-[10px] h-[10px] md:w-[14px] md:h-[13px]" />
            </div>
            <div className="font-medium text-[10px] leading-[15px]  md:font-normal md:text-xs md:leading-[18px] text-[#1B1B1B] ">
              {rating}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
