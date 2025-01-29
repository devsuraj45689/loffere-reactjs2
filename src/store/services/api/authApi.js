// src/services/api/authApi.js
import httpService from '../http/httpService';

const authApi = {
  login: (credentials) => httpService.post('/login', credentials),

  forgotPassword: (email) => httpService.post('/forgotPassword', email),

  // forgotPasswordEmailVerify: (emailData) => httpService.post("/forgotPasswordVerification", emailData),

  // changePassword: (passwordData) =>
  //   httpService.put("/auth/change-password", passwordData),

  resetPassword: (resetData) =>
    httpService.post('/forgotPasswordVerification', resetData),

  createPassword: (createPasswordData) =>
    httpService.post('/register', createPasswordData),

  socialMedia: (createData) => httpService.post('/socialRegister', createData),

  emailVerification: (verifydata) =>
    httpService.post('/emailVerification', verifydata),
};

export default authApi;
