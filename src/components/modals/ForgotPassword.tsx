import React from 'react';
import { CustomModalTwo } from '../CustomModalTwo/CustomModalTwo';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'assets/landing_page/header/logo.svg';
import { Selectors, Reducers } from 'store';
import { generalConfigs } from 'configs';

const { GeneralSelectors } = Selectors;
const { uiReducers } = Reducers;

const fields = [
  {
    id: 'Email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    type: 'email',
  },
];

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const modalStatus = useSelector(GeneralSelectors.forgotPasswordModalStatus);
  const handleOpenForgotPassword = () => {};

  const handleSubmit = () => {};

  const handleSocialLogin = () => {};

  const closeModal = () => {
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.forgotPassword,
        value: false,
      })
    );
  };

  return   <>
  <CustomModalTwo
    title={
      <div className="flex justify-center mb-3">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 md:h-10" />
      </div>
    </div>
    }
    forgotPassModal={<></>}
    description={
      <>
        <div className="w-[100%] flex flex-col justify-center items-center">
            <h1 className="text-3xl text-black">Reset Password</h1>
        </div>
      </>
    }
    formFields={fields}
    submitButtonText="Continue"
    onSubmit={handleSubmit}
    label="ForgetPssword"
    className="ml-5 h-44"
    variant="outline"
    isOpen={modalStatus}
    toggleModal={closeModal}
    socialDispatch={handleSocialLogin}
    footerContent={<></>}
  />
</>;
};

export default ForgotPassword;
