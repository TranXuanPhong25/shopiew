/**
 * Auth service handling API interactions
 */
import axios from 'axios';
import {AuthResponse, User} from './models';

export const authService = {
    /**
     * Get the current user profile
     */
    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await axios.get(`/auth/me`, {
                withCredentials: true
            });

            return response.data;
        } catch (error: any) {
            console.error('Get current user failed:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Login with email and password
     */
    login: async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const body = {email, password};
            const response = await axios.post(`/auth/login`, body, {
                withCredentials: true
            });

            // Return the data including the access token to the client
            return response.data;
        } catch (error: any) {
            console.error('Login action failed:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Register a new user
     */
    register: async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await axios.post(`/auth/register`, {
                email,
                password
            }, {
                withCredentials: true
            });

            return response.data;
        } catch (error: any) {
            console.error('Register action failed:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Logout the current user
     */
    logout: async (): Promise<boolean> => {
        try {
            await axios.post(`/auth/logout`, {}, {
                withCredentials: true
            });

            return true
        } catch (error: any) {
            console.error('Logout action failed:', error.response?.data || error.message);
            throw error;
        }
    }
};
