import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReusableCarousel from './ProductCarosuel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ productCarosuel = [], optionsLabel, isProductList }: any) {
  console.log(productCarosuel, '7');
  const dummyData = [
    {
      id: 1,
      title: 'Sport Bike',
      image: './Bike/image.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Mohammed',
      sellerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      price: 150,
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Cruiser',
      image: './Bike/image_1.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Suresh',
      sellerImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      price: 150,
      rating: 4.0,
    },
    {
      id: 3,
      title: 'Dirt Bike',
      image: './Bike/image_2.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Anjali',
      sellerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      price: 150,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Scooter',
      image: './Bike/image_3.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Rahul',
      sellerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      price: 150,
      rating: 4.2,
    },
    {
      id: 3,
      title: 'Dirt Bike',
      image: './Bike/image_2.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Anjali',
      sellerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      price: 150,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Scooter',
      image: './Bike/image_3.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Rahul',
      sellerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      price: 150,
      rating: 4.2,
    },
    {
      id: 1,
      title: 'Custom Bike',
      image:
        'https://s3-alpha-sig.figma.com/img/b714/4f5c/499b08dea6877cd0c3b5064b45bdda6f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DDgT1r1YayeT4Z-IMPh~~ShQajix9oBe5bNOceCIt5XiofRdMt50EmI8IVisHSSbKJPe6zXHzNhpPsQCfBQeWSYoJ6JWVmWPxmHW7K~J0u0Tk-mftnntiXoIahUMybW1Dxg7e6pNtZi1-vw2W44cbZhH79GPswo4A0JwCN24NlvZ8d8IKEwoA2iN2JCkE3Tyaa6mv~VIR3Vk9CZD~oQkanZPD7Id1MhNobJKLBVAXYkFbCQQCrBZ2j6bkgkvSMiv96SJB1QJmUCY09LuZrdZX77uJ36KBeF1VY5CATcjjjhanoC23O2193X5G4j5dHbw5cuxJ~53fzea5GF4ufDztQ',
      location: 'Pune, India',
      seller: 'Ajay',
      sellerImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      price: 400,
      rating: 4.8,
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
      id: 1,
      title: 'Custom Bike',
      image: './Cars/image.png',
      location: 'Pune, India',
      seller: 'Ajay',
      sellerImage: './Cars/image.png',
      price: 400,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Cruiser',
      image: './Cars/image_1.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Suresh',
      sellerImage: './Cars/image_1.png',
      price: 150,
      rating: 4.0,
    },
    {
      id: 3,
      title: 'Dirt Bike',
      image: './Cars/image_2.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Anjali',
      sellerImage: './Cars/image_2.png',
      price: 150,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Scooter',
      image: './Cars/image_3.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Rahul',
      sellerImage: './Cars/image_3.png',
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
      id: 1,
      title: 'Custom Bike',
      image: './Popular/image_4.png',
      location: 'Pune, India',
      seller: 'Ajay',
      sellerImage: './Popular/image_4.png',
      price: 400,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Cruiser',
      image: './Popular/image_5.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Suresh',
      sellerImage: './Popular/image_5.png',
      price: 150,
      rating: 4.0,
    },
    {
      id: 3,
      title: 'Dirt Bike',
      image: './Popular/image_6.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Anjali',
      sellerImage: './Popular/image_6.png',
      price: 150,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Scooter',
      image: './Popular/image_7.png',
      location: 'Taza-Al Hoceima-Taounate, India',
      seller: 'Rahul',
      sellerImage: './Popular/image_7.png',
      price: 150,
      rating: 4.2,
    },
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3500 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <>
      {productCarosuel?.map((carousel: any, index: any) => (
        <>
          <Container
            className={isProductList ? 'mt-4 ms-0' : 'mt-4'}
            key={carousel}
          >
            <Row className={isProductList ? 'mb-1' : 'mb-4'}>
              <Col className="d-flex justify-content-between align-items-center">
                <h2 className="h4 fw-bold">{carousel}</h2>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: '#26C6DA' }}
                >
                  {optionsLabel ?? 'View All'} →
                </a>
              </Col>
            </Row>
            <ReusableCarousel
              items={dummyData}
              responsive={responsive}
              accentColor="#26C6DA"
              isProductList
            />
          </Container>
          {isProductList && index !== productCarosuel?.length - 1 && (
            <div className="empty_border border-b border-gray-300" />
          )}
        </>
      ))}
    </>
  );
}

export default App;
