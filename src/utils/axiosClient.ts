import axios from 'axios';

// Base URL cho API - lấy từ biến môi trường hoặc config
const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:8080/api';

// Tạo instance axios với các cấu hình mặc định
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    const errorResponse = error.response;
    
    // Xử lý khi token hết hạn (401 Unauthorized)
    if (errorResponse?.status === 401) {
      console.log('Session expired or unauthorized');
      
      // Clear any stored user data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('eticket_user');
        
        // Redirect to login page if not already there
        if (!window.location.pathname.includes('/auth/login')) {
          const currentPath = window.location.pathname;
          window.location.href = `/auth/login?redirectTo=${encodeURIComponent(currentPath)}`;
        }
      }
    }
    
    // Xử lý khi không có quyền truy cập (403 Forbidden)
    if (errorResponse?.status === 403) {
      console.log('Forbidden - Access denied');
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
