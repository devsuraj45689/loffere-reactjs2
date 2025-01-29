import {
  TryOurAppSection,
  ProductsSection,
  HeroSection,
  PopularCategories,
  HowItWorksSection,
} from 'sections';
import RootLayout from '../../layouts/RootLayout';

const Home = () => {
  return (
    <>
      <RootLayout>
        {/* Hero Section Carousel */}
        <div className="mt-2 md:pb-10 container">
          <HeroSection />
        </div>

        {/* Popular Categories */}
        <div className="mt-10 container">
          <PopularCategories />
        </div>

        {/* Product Section */}
        <div className="md:mt-10 container">
          <ProductsSection />
        </div>

        {/* Try Our App Section */}
        <div className="mt-[50px] md:mt-[60px]">
          <TryOurAppSection />
        </div>

        {/* How it works Section */}
        <div className="container pt-[60px] pb-[60px] md:pb-[80px]">
          <HowItWorksSection />
        </div>
      </RootLayout>
    </>
  );
};

export default Home;
