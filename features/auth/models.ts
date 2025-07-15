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
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    loginWithRedirect: (redirectTo: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    updateUserDetails: (details: Partial<User>) => void;
};

export type AuthResponse = {
    user: User;
    token?: string;
};
