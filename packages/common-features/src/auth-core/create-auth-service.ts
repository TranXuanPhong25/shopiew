export interface AxiosClientLike {
	get: (url: string, config?: any) => Promise<{ data: any }>;
	post: (url: string, data?: any, config?: any) => Promise<{ data: any }>;
}

export interface AuthServiceShape<LoginResponse, RegisterResponse, Shop = unknown> {
	getCurrentUser: () => Promise<LoginResponse>;
	login: (email: string, password: string) => Promise<LoginResponse>;
	register: (email: string, password: string) => Promise<RegisterResponse>;
	logout: () => Promise<boolean>;
	getShop: (userId: string) => Promise<Shop>;
}

export function createAuthService<LoginResponse, RegisterResponse, Shop = unknown>(
	axiosClient: AxiosClientLike,
): AuthServiceShape<LoginResponse, RegisterResponse, Shop> {
	return {
		getCurrentUser: async (): Promise<LoginResponse> => {
			const response = await axiosClient.get("/auth/me");
			return response.data;
		},

		login: async (email: string, password: string): Promise<LoginResponse> => {
			const body = { email, password };
			const response = await axiosClient.post("/auth/login", body);
			return response.data;
		},

		register: async (
			email: string,
			password: string,
		): Promise<RegisterResponse> => {
			const response = await axiosClient.post("/auth/register", {
				email,
				password,
			});
			return response.data;
		},

		logout: async (): Promise<boolean> => {
			await axiosClient.post("/auth/logout", {});
			return true;
		},

		getShop: async (userId: string): Promise<Shop> => {
			const response = await axiosClient.get(`/shops/owners/${userId}`);
			return response.data;
		},
	};
}