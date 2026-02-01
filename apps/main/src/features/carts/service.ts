import axiosClient from "@/utils/axiosClient";
import axios from "axios";
import { CartItemPayload } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API;

class CartService {
	async getMyCart() {
		const response = await axiosClient.get(`${API_URL}/carts/mine`);
		return response.data;
	}
	async addToCart(cartItem: CartItemPayload) {
		const response = await axiosClient.post(
			`${API_URL}/carts/mine/items`,
			cartItem,
		);
		return response.data;
	}
	async updateCartItem(cartItem: CartItemPayload) {
		const response = await axiosClient.put(
			`${API_URL}/carts/mine/items`,
			cartItem,
		);
		return response.data;
	}
	async deleteCartItem(cartItemIDs: string[]) {
		const response = await axiosClient.delete(`${API_URL}/carts/mine/items`, {
			data: { ids: cartItemIDs },
		});
		return response.data;
	}
	async getCartItemCount() {
		const response = await axiosClient.get(
			`${API_URL}/carts/mine/total-items`,
		);
		return response.data;
	}
}

export default new CartService();
