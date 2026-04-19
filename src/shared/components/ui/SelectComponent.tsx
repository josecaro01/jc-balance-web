import type { SelectHTMLAttributes, ElementType, ReactNode } from 'react';

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ElementType;
  label?: string;
  error?: string | null;
  children: ReactNode; // Para las <option> o <optgroup>
}

export const SelectComponent = ({
  icon: Icon,
  label,
  error,
  id,
  name,
  className = "",
  children,
  ...props
}: SelectComponentProps) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Label */}
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
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors pointer-events-none z-10" 
          />
        )}
        
        <select
          id={id}
          name={name}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all shadow-sm outline-none appearance-none
            bg-surface text-page-text
            focus:ring-2 focus:ring-primary/20 
            ${error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
            ${Icon ? 'pl-10' : ''} 
          `}
          {...props}
        >
          {children}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="p-1 text-sm text-red-500 animate-in fade-in slide-in-from-top-1 text-left">
          {error}
        </p>
      )}
    </div>
  );
};