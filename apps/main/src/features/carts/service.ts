import axiosClient from "@/utils/axiosClient";

class CartService {
   async getMyCart() {
      const response = await axiosClient.get(`/carts/mine/`);
      return response.data;
   }
}

export default new CartService();   