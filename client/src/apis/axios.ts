import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

let isLoggingOut = false;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: 'repeat',
    }),
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response.data, // return data from server
  (error) => {
    // Lỗi kết nối tới server (mất mạng, server down)
    if (!error.response) {
      return Promise.reject(error.message);
    }

    // if (error.response?.status === 500 && !isLoggingOut) {
    //   isLoggingOut = true;
    //   alert('Phiên đăng nhập đã hết hạn');
    //   Cookies.remove('access_token');
    //   localStorage.removeItem('user');
    //   window.location.href = '/login';
    // }

    // Lỗi server (Internal Server Error)
    if (error.response.status === 500) {
      console.error('Server error:', error.response.data);
      alert('Có lỗi xảy ra từ phía máy chủ, vui lòng thử lại sau.');
    }
    return Promise.reject(error);
  },
);
