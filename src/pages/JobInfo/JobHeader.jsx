import React from 'react';
import companyLogo from '../../assets/images/company_logo.png';
import starIcon from '../../assets/icons/generic/star.png';
import bagIcon from '../../assets/icons/generic/bag.png';
import markerIcon from '../../assets/icons/generic/blurMarker.png';
import favouriteIcon from '../../assets/icons/job-icon/favourite.png';
import shareIcon from '../../assets/icons/job-icon/share.png';

const JobHeader = () => {
  const imageStyle = {
    width: '32px',
    height: '32px',
    margin: '0 5px',
  };

  return (
    <div className="job_header border-b border-gray-300">
      <div className="row">
        <div className="row">
          <div className="company_logo">
            <img src={companyLogo} alt="company_logo" />
          </div>
          <div className="col">
            <div className="row d-flex align-items-end">
              <div className="col">
                <h2>Job Title</h2>
                <p className="d-flex justify-between">
                  Company name
                  <span className="mt-1">
                    <img src={starIcon} alt="star" />
                  </span>
                  <span>4.4</span>
                  <span>{`| (20k reviews)`}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center justify-end">
            <button type="button" className="apply_now_button">
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <p className="d-flex align-items-center justify-start mb-0 pt-2 pb-2">
            {['One', 'Two', 'Three'].map((data, idx) => (
              <>
                <img
                  src={bagIcon}
                  alt="logos"
                  style={{ width: '16px', height: '14px' }}
                />
                <span className="ps-2">{data}</span>
                <span className="px-2">{idx < 2 && ' | '}</span>
              </>
            ))}
          </p>
        </div>
        <div className="row">
          <div className="col d-flex align-items-center">
            <img
              src={markerIcon}
              alt="localtion"
              style={{ width: '14px', height: '16px' }}
            />
            <span className="ps-2">
              {'Taza-Al Hoceima-Taounate (Ambattur Industrial Estate)'}
            </span>
          </div>
          <div className="col d-flex align-items-center justify-end">
            <p className="pe-2 mb-0">{'Posted on 2days ago'}</p>
            <img src={favouriteIcon} alt="tag_logo" style={imageStyle} />
            <img src={shareIcon} alt="share_icon" style={imageStyle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
