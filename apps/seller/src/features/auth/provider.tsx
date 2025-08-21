/**
 * Auth provider component for state management and business logic
 */
"use client";

import React, { useEffect, useReducer, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from './context';
import { AuthService } from './service';
import { Shop, User } from './models';
import { authReducer } from './reducer';

// Component wrapper for useSearchParams to handle Suspense boundary
function AuthProviderWithParams({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        shop: null,
        loading: true
    });

    const router = useRouter();
    const redirectUrl = useSearchParams().get('redirect') || '/';
    const checkAuthStatus = async () => {
        try {
            const userData = await AuthService.getCurrentUser();
            const shop = await AuthService.getShop(userData.userInfo.userId);

            if (!shop) {
                router.push('/shop/create');
                dispatch({ type: 'SET_AUTH_DATA', payload: { user: userData.userInfo, shop: null } });
                return;
            }

            // Single state update - only 1 re-render!
            dispatch({ type: 'SET_AUTH_DATA', payload: { user: userData.userInfo, shop } });

        } catch (error) {
            console.error('Auth check failed:', error);
            dispatch({ type: 'RESET_AUTH' });
            const currentPath = window.location.pathname;
            loginWithRedirect(currentPath);
        }
    };

    // Update specific user details without replacing the entire user object
    const updateUserDetails = (details: Partial<User>) => {
        if (!state.user) return;

        const updatedUser = { ...state.user, ...details };
        dispatch({ type: 'SET_USER', payload: updatedUser });
    };

    const loginWithRedirect = async (redirectTo: string) => {
        const dest = redirectTo ? '/auth/login?redirect=' + redirectTo : '/auth/login';
        router.push(dest);
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            dispatch({ type: 'RESET_AUTH' }); // Instead of SET_USER
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            const user = response.userInfo;
            dispatch({ type: 'SET_USER', payload: user });

            router.push(redirectUrl);
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
            shop: state.shop,
            user: state.user,
            loading: state.loading,
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

// Main AuthProvider component with Suspense boundary
export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div>Loading authentication...</div>}>
            <AuthProviderWithParams>{children}</AuthProviderWithParams>
        </Suspense>
    );
}
