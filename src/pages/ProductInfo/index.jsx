import React from 'react';
import './style.scss';
import RootLayout from '../../layouts/RootLayout';
import BreadCrumb from 'components/CustomBreadCrumb/BreadCrumb';
import Map from 'components/maps/GoogleMapVariant';
import App from 'components/ProductCarosuel/App';
import ProductAds from './ProductAds';
import ProductInfoCarousel from './ProductInfoCarousel';
import FollowReport from './FollowReport';
import ProductHeader from './ProductHeader';
import ProductSeller from './ProductSeller';
import { responsive, dummyCarCarouselist } from '../../configs/Constants';
import brandIcon from '../../assets/icons/product-icons/brand.png';
import documentIcon from '../../assets/icons/product-icons/document.png';
import locationMarker from '../../assets/icons/product-icons/marker.png';
import largeAds from '../../assets/images/largeImage.png';
import smallAds from '../../assets/images/smallSizeImage.png';
import productImage from '../../assets/images/productImage.jpg';

const ProductInfo = () => {
  const testdata = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  const carouselList = ["This pro's ads", 'These ads may interest you'];
  return (
    <RootLayout disableFilter={true}>
      <div className="product_container">
        <div className="breadcrumb-wrapper">
          <BreadCrumb />
        </div>
        <div className="row body_container d-flex justify-between">
          <div className="col col-sm-7 col-md-7 col-lg-8 product_carousel_header">
            <div className="product_image_container">
              <img
                src={productImage}
                alt="product image"
                className="product_image"
              />
              <div className="product_image_carousel min_pad_top">
                <ProductInfoCarousel
                  items={dummyCarCarouselist}
                  responsive={responsive}
                />
              </div>
              <ProductHeader />
            </div>
            <div className="my-3">
              <ProductSeller />
            </div>
            <div className="border-b border-gray-300" />
            <div className="product_criteria min_pad_top border-b border-gray-300">
              <div className="row">
                <h5>Criteria</h5>
              </div>
              <div className="row">
                {testdata?.map((data) => (
                  <div className="col-4 d-flex align-items-center pb-3">
                    <img
                      src={brandIcon}
                      alt="icon"
                      style={{ width: '32px', height: '32px' }}
                    />
                    <div className="ps-2">
                      <p className="mb-0">{data}</p>
                      <h6>{data}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="product_history frame_pad border-b border-gray-300">
              <div className="row">
                <h5>
                  Autoviza{' '}
                  <sup>
                    <span>&#174;</span>
                  </sup>{' '}
                  Vehicle history
                </h5>
                <p>
                  The history report provides you with data on the vehicle's
                  history, certified by a third party in a neutral and
                  independent manner
                </p>
              </div>
              <div className="row pt-2 pb-2">
                {['history', 'history', 'history'].map((data) => (
                  <p className="d-flex">
                    <img
                      src={documentIcon}
                      alt="docIcon"
                      style={{ width: '16px', height: '20px' }}
                    />
                    <span className="ps-3">{data}</span>
                  </p>
                ))}
              </div>
              <button type="button" className="history_button">
                View History Report
              </button>
            </div>
            <div className="product_description frame_pad border-b border-gray-300">
              <h5>Description</h5>
              <p className="mb-1">
                {[
                  'Audi Q3 – Phase 2 2.0 TDI 184CV Quattro S-Tronic 7 Automatic Transmission ',
                  'Sport Mode Sequential mode + steering wheel paddles First MEC: July 2017 5 doors, 5 seats Clean interior',
                ].join(' / ')}
              </p>
            </div>
            <div className="product_location frame_pad border-b border-gray-300">
              <h5 className="d-flex">
                <img src={locationMarker} alt="location marker" />{' '}
                <span className="ps-2">Location, some place</span>
              </h5>
              <Map
                styles={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '15px',
                }}
                isProductMap={true}
              />
            </div>
            <FollowReport />
          </div>
          <ProductAds />
        </div>
        <div className="row product_carousel_list frame_pad border-b border-gray-300">
          <App
            productCarosuel={carouselList}
            optionsLabel="See more ads"
            isProductList={true}
          />
        </div>
        <div className="row mb-4 min_screen_ads">
          <div className="adsSection min_pad_top">
            <div className="row">
              <img src={largeAds} alt="Ads" />
            </div>
            <div className="row min_pad_top">
              <img src={smallAds} alt="Ads" />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductInfo;
