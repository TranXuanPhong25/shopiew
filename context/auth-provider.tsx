"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { loginAction, register as registerAction, logoutAction } from '@/server/auth';
import { redirect, useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

type User = {
  id: string;
  email: string;
  username?: string;
  role: string;
  avatar?: string;
  userDetails?: Record<string, any>; // Additional user details from the API
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  loginWithRedirect: (redirectTo: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  updateUserDetails: (details: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const [redirectTo, setRedirectTo] = useState("/");
   const router = useRouter();
   
   // Initialize by checking auth status on mount
   useEffect(() => {
      checkAuthStatus();
   }, []);
   
   // Update specific user details without replacing the entire user object
   const updateUserDetails = (details: Partial<User>) => {
      if (!user) return;
      
      const updatedUser = { ...user, ...details };
      setUser(updatedUser);
   };

   const loginWithRedirect = async (redirectTo: string) => {
      setRedirectTo(redirectTo);
      router.push('/auth/login');
   };

   const checkAuthStatus = async () => {
      try {
         setLoading(true);
         // Use axiosClient which has withCredentials set to true
         // This ensures cookies are sent with the request
         const response = await axiosClient.get('/auth/me');
         setUser(response.data);
      } catch (error) {
         console.error('Auth check failed:', error);
         setUser(null);
      } finally {
         setLoading(false);
      }
   };

   const logout = async () => {
      try {
         await logoutAction();
         setUser(null);
      } catch (error) {
         console.error('Logout failed:', error);
      }
   };

   const login = async (email: string, password: string) => {
      try {
         const response = await loginAction(email, password);
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
         const response = await registerAction(email, password);
         setUser(response.user);
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

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}