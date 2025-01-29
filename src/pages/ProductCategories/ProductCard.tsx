import { Card, Button } from 'react-bootstrap';
import { Heart, MapPin, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/Product.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = () => {
  return (
    <div className="card-wrapper">
      <Card className="product-category-card ml-0">
        <div className="position-relative">
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            className="product-image"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
            {/* <h3 className="">{item.title}</h3> */}
          </div>
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-3 rounded-circle p-1"
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
              fontFamily: 'Poppins',
            }}
          >
            <Heart size={14} style={{ color: 'white' }} />
          </Button>
        </div>
        <Card.Body className="p-2">
          <span className="product-card-subtitle mb-2">Car</span>
          <div className="product-card-title mt-2">Tata Nexon New</div>{' '}
          {/* Adding the title here */}
          <div className="d-flex align-items-center justify-space-between mb-3 mt-2">
            <div
              className="position-relative"
              style={{
                width: '25px',
                height: '25px',
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
              <MapPin size={16} style={{ color: '#6d7072' }} />
            </div>
            <small className="text-muted ms-2 " style={{ fontSize: '12px' }}>
              Taza-Al Hoceima-Taounate, India
            </small>
            <div
              className="d-flex align-items-center ms-auto rounded-circle"
              style={{
                width: '25px',
                height: '25px',
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
              <Star size={16} style={{ color: '#6d7072' }} />
            </div>
            <small className="text-muted ms-1" style={{ fontSize: '12px' }}>
              4.2 (5 Reviews)
            </small>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div
                className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: '32px', height: '32px' }}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/2.jpg"
                  alt="Seller"
                  className="rounded-circle"
                  style={{ width: '32px', height: '32px' }}
                />
              </div>
              <span className="small">Mohammed</span>
            </div>
            <span
              className="product-price"
              style={{ color: 'rgb(38, 198, 218)', fontSize: '22px' }}
            >
              $5,550
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
