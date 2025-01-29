import React from 'react';
import RootLayout from 'layouts/RootLayout';
import JobHeader from './JobHeader';
import markerIcon from '../../assets/icons/job-icon/marker.png';
import contactIcon from '../../assets/icons/job-icon/contact.png';
import Map from 'components/maps/GoogleMapVariant';
import largeAds from '../../assets/images/largeImage.png';
import smallAds from '../../assets/images/smallSizeImage.png';
import Job from 'components/JobCarosuel/Job';
import './style.scss';

const JobInfo = () => {
  return (
    <RootLayout>
      <div className="job_info_container">
        <div className="exmpty_container" />
        <div className="main_container">
          <div className="row">
            <div className="col col-md-8 col-lg-8">
              <JobHeader />
              <div className="job_desc py-4 border-b border-gray-300">
                <div className="row">
                  <h5>Job Description</h5>
                </div>
                <div className="row">
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Dui enim urna sed
                    arcu ultrices tempor lobortis nunc. Semper ut sit ornare
                    urna eros nulla. Mi luctus consequat eleifend nibh enim
                    vitae nisl egestas consequat. Sem quisque sit phasellus
                    lectus non leo. Lorem ipsum dolor sit amet consectetur. Dui
                    enim urna sed arcu ultrices tempor lobortis nunc.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Dui enim urna sed
                    arcu ultrices tempor lobortis nunc. Semper ut sit ornare
                    urna eros nulla. Mi luctus consequat eleifend nibh enim
                    vitae nisl egestas consequat. Sem quisque sit phasellus
                    lectus non leo. Lorem ipsum dolor sit amet consectetur. Dui
                    enim urna sed arcu ultrices tempor lobortis nunc.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Dui enim urna sed
                    arcu ultrices tempor lobortis nunc. Semper ut sit ornare
                    urna eros nulla. Mi luctus consequat eleifend nibh enim
                    vitae nisl egestas consequat. Sem quisque sit phasellus
                    lectus non leo. Lorem ipsum dolor sit amet consectetur. Dui
                    enim urna sed arcu ultrices tempor lobortis nunc.
                  </p>
                </div>
              </div>
              <div className="company_info py-4">
                <div className="row">
                  <h5>Company Details</h5>
                </div>
                <div className="row">
                  <p className="col d-flex align-items-center">
                    <img
                      src={markerIcon}
                      alt="location_icon"
                      style={{ width: '20px', height: '25px' }}
                    />
                    <span className="ps-3 w-75">{`Address: Teleperformance Global, AMBIT IT PARK 4th and 5th 32 A and B,
                                        Ambattur Industrial Estate Rd, Old Ambattur, Sai Nagar, Ambattur Industrial Estate,
                                        Taza-Al Hoceima-Taounate, Tamil Nadu 600058`}</span>
                  </p>
                </div>
                <div className="row">
                  <p className="col d-flex align-items-center">
                    <img
                      src={contactIcon}
                      alt="contact_logo"
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span className="ps-3">{`Contact - Abdul (abdul@gmail.com)`}</span>
                  </p>
                </div>
                <div className="row">
                  <Map
                    styles={{
                      width: '100%',
                      height: '250px',
                      borderRadius: '15px',
                    }}
                    isProductMap={true}
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row pt-4">
                <img src={largeAds} alt="Ads" />
              </div>
              <div className="row py-4">
                <img src={smallAds} alt="Ads" />
              </div>
            </div>
          </div>
          <div className="row pt-2 pb-5 ps-0 ms-0 job_info_list">
            <Job jobCarosuel={['Jobs you might be interested in']} />
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default JobInfo;
