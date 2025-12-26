import axiosClient from "@/utils/axiosClient";
import axios from "axios";
import { CartItemPayload } from "./types";

class CartService {
   async getMyCart() {

      const response = await axiosClient.get(`http://localhost:8000/api/carts/mine`);
      return response.data;
   }
   async addToCart(cartItem: CartItemPayload) {
      const response = await axiosClient.post(`http://localhost:8000/api/carts/mine/items`,
         cartItem);
      return response.data;
   }
   async updateCartItem(cartItem: CartItemPayload) {
      const response = await axiosClient.put(`http://localhost:8000/api/carts/mine/items`, cartItem);
      return response.data;
   }
   async deleteCartItem(cartItemIDs: string[]) {
      const response = await axiosClient.delete(`http://localhost:8000/api/carts/mine/items`, {
         data: { ids: cartItemIDs }
      });
      return response.data;
   }
}

export default new CartService();   