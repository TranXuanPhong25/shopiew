/**
 * Auth provider component for state management and business logic
 */
"use client";

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {AuthContext} from './context';
import {AuthService} from './service';
import {User} from './models';

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [redirectTo, setRedirectTo] = useState("/");
    const router = useRouter();

    // Initialize by checking auth status on mount
    useEffect(() => {
        console.log("replace me to check auth status");
        // checkAuthStatus();
    }, []);

    // Update specific user details without replacing the entire user object
    const updateUserDetails = (details: Partial<User>) => {
        if (!user) return;

        const updatedUser = {...user, ...details};
        setUser(updatedUser);
    };

    const loginWithRedirect = async (redirectTo: string) => {
        setRedirectTo(redirectTo);
        router.push('/auth/login');
    };

    const checkAuthStatus = async () => {
        try {
            setLoading(true);
            const userData = await AuthService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            const user = response.user;
            setUser(user);

            const dest = redirectTo;
            if (redirectTo !== "/") {
                setRedirectTo("/");
            }
            router.push(dest);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const response = await AuthService.register(email, password);
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            loginWithRedirect,
            checkAuthStatus,
            updateUserDetails
        }}>
            {children}
        </AuthContext.Provider>
    );
}
