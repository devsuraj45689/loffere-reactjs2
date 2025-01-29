import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Heart, MapPin, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomArrow = ({ direction, onClick }: any) => (
  <Button
    onClick={onClick}
    className={`position-absolute ${direction === 'left' ? 'start-0' : 'end-0'} top-50 translate-middle-y z-20`}
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
      margin: direction === 'left' ? '10px 0 0 -0px' : '17px -16px 0 0',
    }}
  >
    {direction === 'left' ? (
      <ArrowLeft size={28} color="#26c6da" />
    ) : (
      <ArrowRight size={28} color="#26c6da" />
    )}
  </Button>
);

const ReusableCarousel = ({
  items,
  responsive,
  accentColor,
  isProductList,
}: any) => {
  return (
    <div
      className="position-relative overflow-hidden"
      style={{ margin: '0 -24px' }}
    >
      <Carousel
        responsive={responsive}
        customLeftArrow={<CustomArrow direction="left" />}
        customRightArrow={<CustomArrow direction="right" />}
        containerClass="px-6"
        itemClass="px-3"
        partialVisible={true}
      >
        {items.map((item: any) => (
          <div key={item.id} className="card-wrapper">
            <Card className="product-card p-0">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={item.image}
                  className="product-image"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  {/* <h3 className="">{item.title}</h3> */}
                </div>
                <Button
                  variant="light"
                  className="position-absolute top-0 end-0 m-2 rounded-circle p-1"
                  style={{
                    width: '28px',
                    height: '28px',
                    background: 'rgba(255, 255, 255, 0.14)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(2.6px)',
                    WebkitBackdropFilter: 'blur(2.6px)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Heart size={14} style={{ color: 'white' }} />
                </Button>
              </div>
              <Card.Body>
                <span>bike</span>
                <h5 className="card-title">{item.title}</h5>{' '}
                {/* Adding the title here */}
                <div className="d-flex align-items-center pb-2 border-b border-gray-300">
                  <div
                    className="position-relative"
                    style={{
                      width: '28px',
                      height: '28px',
                      background: '#d9d1d1',
                      borderRadius: '16px',
                      boxShadow: 'black',
                      backdropFilter: 'blur(2.6px)',
                      WebkitBackdropFilter: 'blur(2.6px)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MapPin size={12} style={{ color: '#6d7072' }} />
                  </div>
                  <small className="text-muted ms-2">{item.location}</small>
                  <div
                    className="d-flex align-items-center ms-auto rounded-circle"
                    style={{
                      width: '28px',
                      height: '28px',
                      background: '#d9d1d1',
                      borderRadius: '16px',
                      boxShadow: 'black',
                      backdropFilter: 'blur(2.6px)',
                      WebkitBackdropFilter: 'blur(2.6px)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Star size={12} style={{ color: '#6d7072' }} />
                  </div>
                  <small className="text-muted ms-1">
                    {isProductList
                      ? `${item.rating} (5 Reviews)`
                      : `${item.rating}/5`}
                  </small>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <img
                        src={item.sellerImage}
                        alt="Seller"
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px' }}
                      />
                    </div>
                    <span className="small">{item.seller}</span>
                  </div>
                  <span
                    className="fw-bold"
                    style={{ color: accentColor, fontSize: '18px' }}
                  >
                    $ {item.price}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ReusableCarousel;
