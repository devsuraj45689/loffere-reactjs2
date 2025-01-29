import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomArrow = ({ direction, onClick }) => (
  <Button
    onClick={onClick}
    className={`position-absolute ${direction === 'left' ? 'start-0' : 'end-0'} top-50 translate-middle-y z-10`}
    style={{
      backgroundColor: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      margin: direction === 'left' ? '0 0 0 2px' : '0 -7px 0 0',
    }}
  >
    {direction === 'left' ? (
      <ChevronLeft size={28} color="#26c6da" />
    ) : (
      <ChevronRight size={28} color="#26c6da" />
    )}
  </Button>
);

const ProductInfoCarousel = ({ items, responsive }) => {
  return (
    <div className="position-relative overflow-hidden">
      <Carousel
        responsive={responsive}
        customLeftArrow={<CustomArrow direction="left" />}
        customRightArrow={<CustomArrow direction="right" />}
        containerClass="px-6"
        itemClass="px-3"
        partialVisible={true}
      >
        {items.map((item) => (
          <div key={item.id} className="card-wrapper">
            <Card className="product-card p-0">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={item.image}
                  className="product-image"
                />
              </div>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductInfoCarousel;
