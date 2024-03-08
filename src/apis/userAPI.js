import axios from 'axios';

const userAPI = axios.create({
  baseURL: 'http://52.79.224.132:8080/',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
userAPI.interceptors.request.use(
  function (config) {
    console.log('request', config);
    return config;
  },
  function (error) {
    console.log('request error', error);
    return Promise.reject(error);
  }
);

export default userAPI;
