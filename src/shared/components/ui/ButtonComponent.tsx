import type { ElementType, ReactNode } from 'react';

interface ButtonComponentProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'filled' | 'outlined';
    colorScheme?: 'primary' | 'secondary' | 'danger';
    icon?: ElementType;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    arialLabel?: string
}

export const ButtonComponent = ({
    children,
    onClick,
    variant = 'filled',
    colorScheme = 'primary',
    icon: Icon,
    className = "",
    type = "button",
    disabled = false,
    arialLabel

}: ButtonComponentProps) => {

    const styles = {
        filled: {
            primary: 'bg-primary text-primary-text border-transparent hover:bg-primary-hover',
            secondary: 'bg-secondary text-secondary-text border-transparent hover:bg-secondary-hover',
            danger: 'bg-red-500 text-white border-transparent hover:bg-red-600',
        },
        outlined: {
            primary: 'bg-transparent border-primary text-primary hover:bg-primary/10',
            secondary: 'bg-transparent border-secondary text-secondary hover:bg-secondary/10',
            danger: 'bg-transparent border-red-500 text-red-500 hover:bg-red-500/10',
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={arialLabel}
            className={`
        flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold  
        border-3  not-disabled:transition-all not-disabled:active:scale-95 disabled:opacity-50  text-sm  not-disabled:cursor-pointer
        ${styles[variant][colorScheme]}
        ${className}
      `}
        >
            {Icon && <Icon width={20}
                height={20} />}
            {children}
        </button>
    );
};