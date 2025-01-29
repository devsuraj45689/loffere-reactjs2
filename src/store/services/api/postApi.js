// src/services/api/authApi.js
import httpService from '../http/httpService';

const postApi = {
  getCategory: () => httpService.get('/getCategory'),

  getSubCategory: (categoryDetail) =>
    httpService.post('/getSubCategory', categoryDetail),

  postProduct: (postData) => httpService.post('/addPost', postData),

  postJob: (postData) => httpService.post('/addJob', postData),

  getDropDown: (postData) => httpService.post('/getCategoryFields', postData),

  getCountries: () => httpService.get('/getCountries'),

  getStates: (countryCode) => httpService.get(`/getStates/${countryCode}`),

  getCities: (code) =>
    httpService.get(`/getCities/${code.country_code}/${code.state_code}`),
};

export default postApi;
