/**
 * Auth service handling API interactions
 */
import { LoginResponse, RegisterResponse, Shop } from "./models";
import axiosClient from "@/lib/clients/shopiewClient";
import { createAuthService } from "@shopiew/common-features/auth-core";

export const AuthService = createAuthService<
	LoginResponse,
	RegisterResponse,
	Shop
>(axiosClient);
