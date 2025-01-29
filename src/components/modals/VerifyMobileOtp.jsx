import React from 'react'
import OTPModal from 'components/OtpModal/OtpModal';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'assets/landing_page/header/logo.svg';
import { Selectors, Reducers } from 'store';
import { generalConfigs } from 'configs';

const { GeneralSelectors } = Selectors;
const { uiReducers } = Reducers;

const VerifyMobileOtp = () => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(GeneralSelectors.verifyMobileOtpModalStatus);
  const formData = useSelector(GeneralSelectors.getModalRequiredData);

  const mobileNumber = 43434; // dummy number
  const closeModal = () => {
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.verifyMobileOtp,
        value: false,
      })
    );
  };

  const handleSubmitMobileOtp = () => {
      
  }

  const submitResendOtp = () => {
      
  }
  

  return (
    <>
        <OTPModal
                title={
                  <div className="flex justify-center items-center">
                    <div className="flex items-center">
                      <img src={logo} alt="Logo" className="header-logo-img" />
                    </div>
                  </div>
                }
                description={
                  <div className="w-[100%] flex flex-col justify-center items-center">
                    <div className="flex">
                      <h6 className="text-25">
                      Verify Mobile Number
                      </h6>
                    </div>
                  </div>
                }
                isOpen={modalStatus}
                onClose={closeModal}
                closeButton='hide'
                onSubmitOtp={handleSubmitMobileOtp}
                email={mobileNumber}
                toggleModal={() => setShowOtpModal(false)}
                resendBtn='false'
                otpSendFunction={submitResendOtp}
                submitButtonText='Verify Mobile'
              />
    </>
  )
}

export default VerifyMobileOtp