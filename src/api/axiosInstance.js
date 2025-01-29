import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}`, // Update with your API URL
  //   timeout: 10000, // Optional: Set a timeout
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem('token'); // Example: Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx causes this function to trigger
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized access - Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
