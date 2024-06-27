import { USER_KEYS } from '@/configs';
import { TIME_CONSTANTS } from '@/constants';
import { getItem } from '@/utils';
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: TIME_CONSTANTS._15_SECONDS,
  headers: {
    Accept: 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    // Handle Authorization Token
    const token = getItem(USER_KEYS.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
