import { useEffect } from 'react';

interface Props {
    message: string;
    type: 'success' | 'error' | 'warning';
    onClose: () => void;
    duration?: number;
}

export const SnackbarComponent = ({ message, type, onClose, duration = 3000 }: Props) => {

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const styles = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        warning: 'bg-amber-500',
    };

    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg text-white animate-fade-in 
        transition-transform duration-300 ease-out ${styles[type]}`}>
            <span className="text-lg">
                {type === 'success' && '✅'}
                {type === 'error' && '❌'}
                {type === 'warning' && '⚠️'}
            </span>
            <p className="font-medium text-sm">{message}</p>
            <button onClick={onClose} className="ml-4 hover:opacity-70 text-white/80">
                ✕
            </button>
        </div>
    );
};