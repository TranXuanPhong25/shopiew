/**
 * Auth feature models and types
 */

export type User = {
    id: string;
    email: string;
    username?: string;
    role: string;
    avatar?: string;
    userDetails?: Record<string, any>; // Additional user details from the API
};

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<LoginResponse>;
    register: (email: string, password: string) => Promise<RegisterResponse>;
    logout: () => Promise<void>;
    loginWithRedirect: (redirectTo: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    updateUserDetails: (details: Partial<User>) => void;
};

export type LoginResponse = {
    userInfo: User;
    token?: string;
};

export type RegisterResponse = {
    message?: string;
    error?: string
}