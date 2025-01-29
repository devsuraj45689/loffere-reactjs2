import React from 'react';
import channelLogo from '../../assets/icons/product-icons/channelLogo.png';
import starsIcon from '../../assets/icons/product-icons/stars.png';
import exclamationIcon from '../../assets/icons/product-icons/exclamation.png';

const FollowReport = () => {
  return (
    <>
      <div className="channel_follow_container mid_margin border border-gray-300 mid_radius">
        <div className="row p-3">
          <div className="row">
            <div className="col-8 d-flex align-items-center">
              <img
                src={channelLogo}
                alt="icon"
                style={{ width: '80px', height: '100%' }}
              />
              <div className="ps-2">
                <h5>SIV AUTO 555</h5>
                <div className="d-flex">
                  <img src={starsIcon} alt="star icon" />
                  <span>{'(12)'}</span>
                </div>
              </div>
            </div>
            <div className="col text-end">
              <button type="button" className="follow_button">
                Follow
              </button>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col d-flex align-items-center">
              <button type="button" className="pro_button">
                Pro
              </button>
              <p className="ps-3 mb-0">SIRET No.: 444582156</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300" />
      <div className="report_container mid_margin border border-gray-300 mid_radius">
        <div className="border-b border-gray-300">
          <div className="row min_pad ">
            <div className="col d-flex align-items-center">
              <img src={exclamationIcon} alt="exclamation" />
              <span className="ps-2">
                Did you find any problem with this item?
              </span>
            </div>
          </div>
        </div>
        <div className="row min_pad">
          <div className="col">Add id: #5652</div>
          <div className="col text-end">
            <button type="button" className="report_button p-2">
              Report this add
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 temp_border" />
    </>
  );
};

export default FollowReport;
