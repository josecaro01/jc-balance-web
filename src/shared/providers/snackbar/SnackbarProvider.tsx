import { SnackbarComponent } from "@shared/components";
import { useCallback, useState, type ReactNode } from "react";
import { SnackbarContext } from "./SnackbarContext";





export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<{ msg: string; type: 'success' | 'error' | 'warning' } | null>(null);

    const showSnackbar = useCallback((msg: string, type: 'success' | 'error' | 'warning' = 'success') => {
        setConfig({ msg, type });
    }, []);

    const hideSnackbar = useCallback(() => setConfig(null), []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            {config && <SnackbarComponent message={config.msg} type={config.type} onClose={hideSnackbar} />}
        </SnackbarContext.Provider>
    );
};

