"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { SetStateAction } from "react";

const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:8080/api';

const loginAction = async (email: string, password: string) => {
   try {
      const body = { email, password };
      const response = await axios.post(`${API_URL}/auth/login`, body, { 
         withCredentials: true 
      });
      
      // The backend should set the JSESSIONID cookie automatically
      // Additionally, we can set an access_token cookie if provided
      if (response.data.accessToken) {
         // Set an httpOnly cookie for secure storage that the browser will send automatically
         (await cookies()).set('access_token', response.data.accessToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
         });
      }
      
      // Return the data including the access token to the client
      // This allows the client to use it for the Authorization header
      return response.data;
   } catch (error: any) {
      console.error('Login action failed:', error.response?.data || error.message);
      throw error;
   }
};

const register = async (email: string, password: string) => {
   try {
      const response = await axios.post(`${API_URL}/auth/register`, { 
         email, 
         password 
      }, { 
         withCredentials: true 
      });
      
      // Handle any token in the response
      if (response.data.accessToken) {
         (await cookies()).set('access_token', response.data.accessToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
         });
      }
      
      return response.data;
   } catch (error: any) {
      console.error('Register action failed:', error.response?.data || error.message);
      throw error;
   }
};

const logoutAction = async () => {
   try {
      await axios.post(`${API_URL}/auth/logout`, {}, { 
         withCredentials: true 
      });
      
      // Clear cookies
      (await cookies()).delete('access_token');
   } catch (error: any) {
      console.error('Logout action failed:', error.response?.data || error.message);
      throw error;
   }
};

export { loginAction, register, logoutAction };