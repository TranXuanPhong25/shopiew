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

// Store and retrieve user from localStorage
const LOCAL_STORAGE_USER_KEY = 'eticket_user';

const getUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error reading user from localStorage:', error);
    return null;
  }
};

const saveUserToStorage = (user: User | null) => {
  if (typeof window === 'undefined') return;
  
  try {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);
   const [redirectTo, setRedirectTo] = useState("/");
   const router = useRouter();
   
   // Load user from localStorage on mount and set up auth check
   useEffect(() => {
      // First try to get user from localStorage to prevent flicker
      const storedUser = getUserFromStorage();
      if (storedUser) {
        setUser(storedUser);
      }
      
      // Then verify with the server
      checkAuthStatus();
   }, []);

   // Custom setter for user that also updates localStorage
   const updateUser = (newUser: User | null) => {
      setUser(newUser);
      saveUserToStorage(newUser);
   };
   
   // Update specific user details without replacing the entire user object
   const updateUserDetails = (details: Partial<User>) => {
      if (!user) return;
      
      const updatedUser = { ...user, ...details };
      updateUser(updatedUser);
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
         updateUser(response.data);
      } catch (error) {
         console.error('Auth check failed:', error);
         updateUser(null);
      } finally {
         setLoading(false);
      }
   };

   const logout = async () => {
      try {
         await logoutAction();
         updateUser(null);
      } catch (error) {
         console.error('Logout failed:', error);
      }
   };

   const login = async (email: string, password: string) => {
      try {
         const response = await loginAction(email, password);
         const user = response.user;
         updateUser(user);
         
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
         updateUser(response.user);
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