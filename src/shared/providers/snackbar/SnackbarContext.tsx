import { createContext } from "react";

interface SnackbarContextType {
    showSnackbar: (message: string, type: 'success' | 'error' | 'warning') => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)