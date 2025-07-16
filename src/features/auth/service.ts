/**
 * Auth service handling API interactions
 */
import axios from 'axios';
import {LoginResponse, RegisterResponse, User} from './models';
import axiosClient from '@/utils/axiosClient';

export const AuthService = {
    /**
     * Get the current user profile
     */
    getCurrentUser: async (): Promise<LoginResponse> => {
        try {
            const response = await axiosClient.get(`/auth/me`, {
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
    login: async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const body = {email, password};
            const response = await axiosClient.post(`/auth/login`, body,
                {
                    withCredentials: true
                }
            );

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
    register: async (email: string, password: string): Promise<RegisterResponse> => {
        try {
            const response = await axiosClient.post(`/auth/register`, {
                email,
                password
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
            await axiosClient.post(`/auth/logout`, {}, {
                withCredentials: true
            });

            return true
        } catch (error: any) {
            console.error('Logout action failed:', error.response?.data || error.message);
            throw error;
        }
    }
};
