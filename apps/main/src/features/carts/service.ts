import axiosClient from "@/utils/axiosClient";
import axios from "axios";
import { CartItemPayload } from "./types";

class CartService {
   async getMyCart() {

      // const response = await axiosClient.get(`/carts/mine/`);
      const response = await axios.get(`http://localhost:8080/api/carts/mine`, {
         withCredentials: true,
         headers: {
            "X-User-Id": "e8959523-d510-45da-916a-76f9f46f280c"
         }
      });
      return response.data;
   }
   async addToCart(cartItem: CartItemPayload) {
      const response = await axios.post(`http://localhost:8080/api/carts/mine/items`,
         cartItem, 
         {
            headers: {
               "X-User-Id": "e8959523-d510-45da-916a-76f9f46f280c"
            }
         }
      );
      return response.data;
   }
   async updateCartItem(cartItem: CartItemPayload) {
      const response = await axios.put(`http://localhost:8080/api/carts/mine/items`, cartItem, {
         headers: {
            "X-User-Id": "e8959523-d510-45da-916a-76f9f46f280c"
         }
      });
      return response.data;
   }
   async removeCartItem(cartItem: CartItemPayload) {
      const response = await axios.delete(`http://localhost:8080/api/carts/mine/items`, {
         data: cartItem,
         headers: {
            "X-User-Id": "e8959523-d510-45da-916a-76f9f46f280c"
         }
      });
      return response.data;
   }
}

export default new CartService();   