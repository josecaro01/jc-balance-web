import { type InputHTMLAttributes, type ElementType, useState, memo } from 'react';
import { LockEyeIcon, UnlockEyeIcon } from '../icons';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType;
  label?: string;
  error?: string;
}

export const InputComponent = memo(({
  icon: Icon,
  label,
  error,
  id,
  className = "",
  type = "text",
  ...props
}: InputComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Label (Opcional) */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-page-text mb-2 text-left"
        >
          {label}
        </label>
      )}

      <div className="relative group w-full">
        {/* Icono dinámico */}
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none"
          />
        )}

        <input
          id={id}
          type={inputType}

          className={`
            w-full px-4 py-3 rounded-xl border transition-all shadow-sm outline-none
            bg-surface text-page-text placeholder:text-page-text/30
            focus:ring-2 focus:ring-primary/20 
            ${error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
            ${Icon ? 'pl-10' : ''} 
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
          >
            {showPassword ? (
              <UnlockEyeIcon className="w-5 h-5" />
            ) : (
              <LockEyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Error (Opcional) */}
      {error && (
        <div className="p-1 text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </div>
      )}
    </div>
  );
});