import React from 'react'
import OTPModal from 'components/OtpModal/OtpModal';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'assets/landing_page/header/logo.svg';
import { Selectors, Reducers } from 'store';
import { generalConfigs } from 'configs';

const { GeneralSelectors } = Selectors;
const { uiReducers } = Reducers;

const Otp = () => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(GeneralSelectors.otpModalStatus);

  const closeModal = () => {
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.login,
        value: false,
      })
    );
  };
  

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
                        {showOtpModalType === 'mobileOtp'
                          ? 'Verify Mobile Number'
                          : showOtpModalType !== 'forgotpassword'
                            ? 'Verify Email'
                            : ''}
                      </h6>
                    </div>
                  </div>
                }
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                closeButton={
                  showOtpModalType !== 'forgotpassword' ? 'hide' : 'show'
                }
                onSubmitOtp={
                  showOtpModalType === 'mobileOtp'
                    ? submitMobileOtp
                    : showOtpModalType !== 'forgotpassword'
                      ? submitOtp
                      : submitForgotOtp
                }
                email={showOtpModalType !== 'mobileOtp' ? email : mobileNumber}
                toggleModal={() => setShowOtpModal(false)}
                resendBtn={
                  showOtpModalType === 'mobileOtp'
                    ? 'false'
                    : showOtpModalType !== 'forgotpassword'
                      ? 'true'
                      : 'true'
                }
                otpSendFunction={submitResendOtp}
                submitButtonText={
                  showOtpModalType === 'mobileOtp'
                    ? 'Verify Mobile'
                    : showOtpModalType !== 'forgotpassword'
                      ? 'Verify Email'
                      : 'Submit'
                }
              />
    </>
  )
}

export default Otp