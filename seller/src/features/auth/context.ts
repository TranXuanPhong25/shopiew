/**
 * Auth context for state management
 */
"use client";

import {createContext} from 'react';
import {AuthContextType} from './models';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
