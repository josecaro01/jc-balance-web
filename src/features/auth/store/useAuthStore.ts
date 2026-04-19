import { create } from 'zustand';
import type { User } from '../types';

// Definimos los 3 estados lógicos de una sesión con Cookies
type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthState {
    user: User | null;
    status: AuthStatus;
    // Acciones para cambiar el estado
    setAuthenticated: (user: User) => void;
    setUnauthenticated: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    status: 'checking', // Siempre empezamos verificando la cookie

    setAuthenticated: (user) => set({ 
        user, 
        status: 'authenticated' 
    }),

    setUnauthenticated: () => set({ 
        user: null, 
        status: 'unauthenticated' 
    }),

    // El logout limpia el estado local inmediatamente
    logout: () => set({ 
        user: null, 
        status: 'unauthenticated' 
    }),
}));