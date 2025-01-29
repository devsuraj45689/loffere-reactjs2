import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {
  Heart,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Dot,
} from 'lucide-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/JobCarousel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const CustomArrow = ({ direction, onClick }: any) => (
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
      margin: direction === 'left' ? '0 0 0 -0px' : '0px -15px 0 0',
    }}
  >
    {direction === 'left' ? (
      <ArrowLeft size={28} color="#26c6da" />
    ) : (
      <ArrowRight size={28} color="#26c6da" />
    )}
  </Button>
);

const ReusableCarousel = ({ items, responsive, accentColor }: any) => {
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
          <div key={item.id} className="job-card-wrapper">
            <Card>
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"></div>
                <Button
                  variant="light"
                  className="like-icon position-absolute top-0 end-0 m-2 rounded-circle p-1"
                >
                  <Heart size={14} style={{ color: 'white' }} />
                </Button>
              </div>
              <Card.Body>
                <h5 className="card-title w-75">{item.title}</h5>{' '}
                {/* Adding the title here */}
                <div className="d-flex align-items-center pb-3 mt-3">
                  <span>Salary</span>
                  <span>
                    <Dot color="#0f0f0f" />
                  </span>
                  <span>${item.salary}</span>
                  <span> / Year</span>
                </div>
                <button className="btn btn-info">Simplified application</button>
                <div className="d-flex align-items-center mb-2 mt-3">
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
                </div>
                <div className="d-flex align-items-center mb-2 mt-3">
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
                    <Calendar size={12} style={{ color: '#6d7072' }} />
                  </div>
                  <small className="text-muted ms-2">{item.days}</small>
                  <span>
                    <Dot color="#0dcaf0" />
                  </span>
                  <span className="text-info">{item.post}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center company_circle_logo">
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2 company_circle_logo_container"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <img
                        src={item.companyImage}
                        alt="Seller"
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px' }}
                      />
                    </div>
                    <span className="text-bold">{item.companyName}</span>
                  </div>
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
