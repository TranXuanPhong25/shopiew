"use client";
import { useAuth } from "@/features/auth/hook";
import { Skeleton } from "../ui/skeleton";
import LoadingBlock from "../ui/loading-block";
import { useEffect } from "react";

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
   const {checkAuthStatus, user, loginWithRedirect, loading } = useAuth();
   useEffect(() => {
      checkAuthStatus();
   }, []);

   if (loading) {
      return <LoadingBlock className="h-screen w-full mt-4" />;
   }

   if (!user) {
      loginWithRedirect(window.location.href);
      return null;
   }
   

   return children   
};
export default ProtectedPage;