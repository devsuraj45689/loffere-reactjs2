import React from 'react';
import profilePicture from '../../assets/images/profile_pic.png';
import starsIcon from '../../assets/icons/product-icons/stars.png';

const ProductSeller = () => {
  return (
    <div className="profile_container border border-gray-300 mid_radius">
      <div className="row p-3">
        <div className="row ms-0 px-0 pb-3">
          <div className="col-8 d-flex align-items-center">
            <img
              src={profilePicture}
              alt="icon"
              style={{ width: '80px', height: '80px', borderRadius: '40px' }}
            />
            <div className="ps-2">
              <h5>John</h5>
              <p className="mb-2">6 ads</p>
              <div className="d-flex">
                <img src={starsIcon} alt="star icon" />
                <span>{`(12)`}</span>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex justify-end align-items-center">
            <h3>{'>'}</h3>
          </div>
        </div>
        <div className="row border-b border-gray-300 ms-0" />
        <div className="row pt-3">
          <div className="col mt-1">
            <button type="button" className="to_book_button w-100">
              To Book
            </button>
          </div>
          <div className="col mt-1">
            <button type="button" className="message_button w-100">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSeller;
