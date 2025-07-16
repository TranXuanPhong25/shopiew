import axios from 'axios';

// Base URL cho API - lấy từ biến môi trường hoặc config
const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:8080/api';

// Tạo instance axios với các cấu hình mặc định
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cho phép gửi cookie nếu cần
});

// Xử lý request trước khi gửi
axiosClient.interceptors.request.use(
  (config) => {
    // Check for localStorage token if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý response trước khi trả về
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu trực tiếp
    return response;
  },
  (error) => {
    // Xử lý lỗi API
    return Promise.reject(error);
  }
);

export default axiosClient;
