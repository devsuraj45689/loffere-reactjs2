import carouselone from '../assets/landing_page/carousel_img_1.png';
import carouseltwo from '../assets/landing_page/carousel_img_2.png';

const HeroCarouselCard = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-full object-cover rounded-xl carousel-h-310 "
  />
);

const HeroCarousel = [
  { src: carouselone, alt: 'Slide-1' },
  { src: carouseltwo, alt: 'Slide-2' },
  { src: carouselone, alt: 'Slide-1' },
  { src: carouseltwo, alt: 'Slide-2' },
  { src: carouselone, alt: 'Slide-1' },
  { src: carouseltwo, alt: 'Slide-2' },
  { src: carouselone, alt: 'Slide-1' },
  { src: carouseltwo, alt: 'Slide-2' },
];

export const slideList = [
  {
    content: (
      <img
        src={carouselone}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310 "
      />
    ),
  },
  {
    content: (
      <img
        src={carouseltwo}
        alt="Slide 2"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouselone}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouseltwo}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouselone}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouseltwo}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouselone}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouseltwo}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouselone}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
  {
    content: (
      <img
        src={carouseltwo}
        alt="Slide 1"
        className="w-full h-full object-cover rounded-xl carousel-h-310"
      />
    ),
  },
];

export const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3500 }, items: 6 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export const dummyCarCarouselist = [
  {
    id: 1,
    title: 'Sport Bike',
    image:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Taza-Al Hoceima-Taounate, India',
    seller: 'Mohammed',
    sellerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    price: 150,
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Cruiser',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Taza-Al Hoceima-Taounate, India',
    seller: 'Suresh',
    sellerImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    price: 150,
    rating: 4.0,
  },
  {
    id: 3,
    title: 'Dirt Bike',
    image:
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Taza-Al Hoceima-Taounate, India',
    seller: 'Anjali',
    sellerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    price: 150,
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Scooter',
    image:
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Taza-Al Hoceima-Taounate, India',
    seller: 'Rahul',
    sellerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    price: 150,
    rating: 4.2,
  },
  {
    id: 5,
    title: 'Electric Bike',
    image:
      'https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Taza-Al Hoceima-Taounate, India',
    seller: 'Priya',
    sellerImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    price: 150,
    rating: 4.6,
  },
  {
    id: 6,
    title: 'Mountain Bike',
    image:
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80',
    location: 'Bangalore, India',
    seller: 'Kumar',
    sellerImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    price: 200,
    rating: 4.1,
  },
  {
    id: 7,
    title: 'Adventure Bike',
    image:
      'https://images.unsplash.com/photo-1508357941501-0924cf312bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Delhi, India',
    seller: 'Arun',
    sellerImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    price: 300,
    rating: 4.3,
  },
  {
    id: 8,
    title: 'Touring Bike',
    image:
      'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80',
    location: 'Hyderabad, India',
    seller: 'Rajesh',
    sellerImage: 'https://randomuser.me/api/portraits/men/6.jpg',
    price: 500,
    rating: 4.4,
  },
  {
    id: 9,
    title: 'Street Bike',
    image:
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: 'Mumbai, India',
    seller: 'Ravi',
    sellerImage: 'https://randomuser.me/api/portraits/men/7.jpg',
    price: 250,
    rating: 4.0,
  },
  {
    id: 10,
    title: 'Custom Bike',
    image:
      'https://images.unsplash.com/photo-1525160354320-d8e92641c563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    location: 'Pune, India',
    seller: 'Ajay',
    sellerImage: 'https://randomuser.me/api/portraits/men/8.jpg',
    price: 400,
    rating: 4.8,
  },
];
