import OTPModal from 'components/OtpModal/OtpModal';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'assets/landing_page/header/logo.svg';
import { Selectors, Reducers } from 'store';
import { generalConfigs } from 'configs';

import {
    verifyOtp
  } from 'store/slices/authSlice';

const { GeneralSelectors } = Selectors;
const { uiReducers } = Reducers;

const VerifyEmailOtp = () => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(GeneralSelectors.verifyEmailOtpModalStatus);
  const formData = useSelector(GeneralSelectors.getModalRequiredData);
  const closeModal = () => {
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.verifyEmailOtp,
        value: false,
      })
    );
  };

  const openMobileVerification = () => {
      dispatch(
        uiReducers.showHideModal({
          modalName: generalConfigs.modals.verifyMobile,
          value: true,
          data: formData
        })
      )
  }

  const verify = async(otp) => {
    try {
        const otpResult = await dispatch(verifyOtp({ email:formData?.Email, otp }));
  
        if (otpResult?.meta.requestStatus === 'fulfilled') {
          showToast('Email verification successful!', 'success');          closeModal();
          openMobileVerification();
        } else {
          showToast('Invalid OTP. Please try again.', 'error');
        }
      } catch (error) {
        showToast('Error occurred during OTP verification.', 'error');
        console.error('OTP verification error:', error);
      }
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
                      Verify Email
                      </h6>
                    </div>
                  </div>
                }
                isOpen={modalStatus}
                onClose={closeModal}
                closeButton='hide'
                onSubmitOtp={verify}
                email={formData?.Email}
                toggleModal={closeModal}
                resendBtn='true'
                otpSendFunction={submitResendOtp}
                submitButtonText='Verify Email'
              />
    </>
  )
}

export default VerifyEmailOtp