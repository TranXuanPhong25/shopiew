"use client";
import {useAuth} from "@/features/auth/hook";
import LoadingBlock from "../ui/loading-block";
import {useEffect} from "react";

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
   const {checkAuthStatus, user, loginWithRedirect, loading } = useAuth();
   useEffect(() => {
      checkAuthStatus();
   }, [checkAuthStatus]);

   if (loading) {
      return <LoadingBlock/>;
   }

   if (!user) {
      loginWithRedirect(window.location.href);
      return null;
   }
   

   return children   
};
export default ProtectedPage;