"use client";

import { createContext, useContext } from "react";

export function createAuthContext<T>(hookName = "useAuth") {
	const AuthContext = createContext<T | undefined>(undefined);

	const useAuthContext = () => {
		const context = useContext(AuthContext);
		if (context === undefined) {
			throw new Error(`${hookName} must be used within an AuthProvider`);
		}
		return context;
	};

	return {
		AuthContext,
		useAuthContext,
	};
}