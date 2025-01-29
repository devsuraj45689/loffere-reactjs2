import { generalConfigs } from 'configs';

export const loginModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.login];
export const registerModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.register];
export const forgotPasswordModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.forgotPassword];
export const verifyMobileModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.verifyMobile];
export const otpModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.otp];
export const verifyMobileOtpModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.verifyMobileOtp];
export const verifyEmailOtpModalStatus = (state: any) =>
  state.ui.modals[generalConfigs.modals.verifyEmailOtp];
export const getModalRequiredData = (state: any) =>
  state.ui.modalRequiredData;