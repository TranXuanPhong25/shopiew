/**
 * Auth service handling API interactions
 */
import { LoginResponse, RegisterResponse } from "./models";
import axiosClient from "@/utils/axiosClient";
import { createAuthService } from "@shopiew/common-features/auth-core";

export const AuthService = createAuthService<LoginResponse, RegisterResponse>(
	axiosClient,
);
