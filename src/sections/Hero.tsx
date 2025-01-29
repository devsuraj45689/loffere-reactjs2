import HeroCarouselData from 'data/heroCarousel-data.json';
import { UiElements } from 'components';
const { Carousel, Cards } = UiElements;

const Hero = () => {
  return (
    
      <section>
        <Carousel
          arrows={false}
          dots={true}
          data={HeroCarouselData}
          ChildComponent={Cards.HeroCarouselCard}
          childToShow={2}
          mob_res={1}
        />
      </section>
  
  );
};

export default Hero;
