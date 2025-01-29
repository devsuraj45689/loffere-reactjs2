import appStoreImg from 'assets/landing_page/footer/appstore-icon.png';
import playStoreImg from 'assets/landing_page/footer/googleplay-icon.png';
import mobileAppImg from 'assets/landing_page/footer/app-image.png';

const OurApp = () => {
  return (
    
      <section className="w-full bg-[#2CB1B5] flex flex-col md:flex-row md:justify-center gap-[20px] md:gap-[22px] p-[30px] items-center">
        <div className="flex flex-col items-center md:items-start gap-0 md:pr-6 md:border-r md:border-[#FFFFFF4D]">
          <p className="text-[18px] text-white font-semibold leading-[27px] mb-0">
            Get Your App Today
          </p>
          <div className="flex">
            <img
              src={appStoreImg}
              alt="App Store"
              className="store-button me-2"
            />
            <img
              src={playStoreImg}
              alt="Google Play"
              className="store-button"
            />
          </div>
        </div>
        <div className="md:w-[40%] w-[80%] flex flex-col gap-1 md:gap-0 items-center md:items-start">
          <h6 className="text-[24px] leading-[36px] font-semibold md:text-[36px] md:leading-[54px] text-white md:mb-0">
            Try the <span className="text-black">Loffre.ma</span> App
          </h6>
          <p className="text-[15px] max-md:text-center font-normal leading-[22.5px] md:text-[20px] md:font-medium md:leading-[30px] text-white md:mb-0">
            Lorem ipsum dolor sit amet consectetur. Elit quam consequat eget
            commodo orci massa. Integer consequat tristique lorem.
          </p>
        </div>
        <div className="w-[210px] h-[262px] md:h-[340px] md:w-[280px] relative">
          <img
            src={mobileAppImg}
            alt="Mobile App"
            className="absolute left-0 h-full w-full top-0 object-cover"
          />
        </div>
      </section>
    
  );
};

export default OurApp;
