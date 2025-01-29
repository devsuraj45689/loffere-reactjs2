import React from 'react';
import wishlistIcon from '../../assets/icons/generic/wishlist.png';
import shareIcon from '../../assets/icons/generic/Share.png';

const ProductHeader = () => {
  return (
    <div className="product_header_container frame_pad border-b border-gray-300">
      <div className="row">
        <div className="col-8">
          <h5>Product name</h5>
        </div>
        <div className="col d-flex justify-end">
          <img src={wishlistIcon} alt="wishlist" />
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-8">
          <p className="d-flex align-items-center">
            {['My', 'car', 'description'].join(' * ')}
          </p>
        </div>
        <div className="col d-flex justify-end">
          <img src={shareIcon} alt="wishlist" />
        </div>
      </div>
      <div className="row pt-3">
        <div className="col">
          <h5 style={{ color: 'rgba(44, 177, 181, 1)' }}>$ 89 898</h5>
        </div>
        <div className="col text-end">2 Weeks ago</div>
      </div>
    </div>
  );
};

export default ProductHeader;
