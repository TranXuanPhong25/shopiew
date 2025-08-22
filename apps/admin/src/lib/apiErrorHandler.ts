import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// Xử lý lỗi từ API và trả về message phù hợp
export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Xử lý lỗi từ Axios
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.message) {
      return data.message;
    }

    if (data?.errors) {
      // Nếu có danh sách lỗi chi tiết, lấy lỗi đầu tiên
      const firstErrorField = Object.keys(data.errors)[0];
      const firstError = data.errors[firstErrorField][0];
      return `${firstErrorField}: ${firstError}`;
    }

    if (error.response?.status === 401) {
      return 'Bạn không có quyền thực hiện hành động này. Vui lòng đăng nhập lại.';
    }

    if (error.response?.status === 403) {
      return 'Bạn không có quyền thực hiện hành động này.';
    }

    if (error.response?.status === 404) {
      return 'Không tìm thấy tài nguyên yêu cầu.';
    }

    if (error.response?.status === 422) {
      return 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
    }

    if ((error.response?.status || 0) >= 500) {
      return 'Đã xảy ra lỗi từ máy chủ. Vui lòng thử lại sau.';
    }

    return error.message || 'Đã xảy ra lỗi không xác định.';
  }

  // Xử lý các loại lỗi khác
  if (error instanceof Error) {
    return error.message;
  }

  return 'Đã xảy ra lỗi không xác định.';
};

