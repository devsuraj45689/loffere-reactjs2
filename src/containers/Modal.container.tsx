import React from 'react';
import { Modals } from 'components';
import { useSelector } from 'react-redux';

const ModalContainer = () => {
  const state = useSelector((state: any) => state);
  console.log(state, '8');
  return (
    <>
      <Modals.Login />
      <Modals.Register />
      <Modals.ForgotPassword />
      <Modals.VerifyMobile />
      <Modals.VerifyMobileOtp />
      <Modals.VerifyEmailOtp />
    </>
  );
};

export default ModalContainer;
