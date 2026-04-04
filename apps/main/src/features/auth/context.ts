/**
 * Auth context for state management
 */
"use client";

import { createAuthContext } from "@shopiew/common-features/auth-core";
import { AuthContextType } from "./models";

const { AuthContext, useAuthContext } = createAuthContext<AuthContextType>();

export { AuthContext, useAuthContext };
