import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from 'components/ui/carousel/carousel.jsx';
import img1 from '../../assets/landing_page/vec_1.png';
import img2 from '../../assets/landing_page/vec_2.png';
import img3 from '../../assets/landing_page/vec_3.png';
import img4 from '../../assets/landing_page/vec_4.png';
import img5 from '../../assets/landing_page/vec_5.png';
import img6 from '../../assets/landing_page/vec_6.png';
import img7 from '../../assets/landing_page/vec_7.png';
import img8 from '../../assets/landing_page/vec_8.png';

export function CustomCarouselOne() {
  const images = [
    { image_url: img1, text: 'Home Appliances' },
    { image_url: img2, text: 'Console and Video Games' },
    { image_url: img3, text: 'Electronics' },
    { image_url: img4, text: 'Musical Instrument' },
    { image_url: img5, text: 'Furniture' },
    { image_url: img6, text: 'Mobile Phone & Tablets' },
    { image_url: img7, text: 'Clothing Accessories' },
    { image_url: img8, text: 'Pet Products' },
  ];

  return (
    <div className="w-full flex justify-center mb-3">
      <Carousel className="w-[90%]">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <h1 className="font-semibold">Popular Categories</h1>
          </div>
          <div className="p-3"></div>
          <div>
            <CarouselPrevious variant={''} className={`rounded-full mr-2`} />
            <CarouselNext variant={''} className={`rounded-full`} />
          </div>
        </div>
        <CarouselContent className="-ml-1 flex">
          {images.map((data, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              // className="flex-shrink-0 lg:w-[12.666667%] sm:w-[33.333333%] md:w-[25%]"
            >
              <div className="h-120 w-120 flex flex-col justify-center items-center">
                <div className="bg-[#DEFEFF] rounded-full flex justify-center items-center w-100 h-100">
                  <img src={data.image_url} alt={data.text} />
                </div>
              </div>
              <div className="text-wrap w-full h-[20%] flex text-center">
                <p>{data.text}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
