import { useState, useActionState, startTransition, useCallback, useMemo, useRef, type ChangeEvent } from 'react';

interface FormResponse {
  success: string | null;
  error?: string | null;
}

interface UseActionFormProps<T> {
  action: (prevState: FormResponse, formData: FormData) => Promise<FormResponse>;
  initialState: T;
  validate?: (values: T) => Record<string, string>;
}

export function useActionForm<T extends Record<string, any>>({
  action,
  initialState,
  validate
}: UseActionFormProps<T>) {
  // Estados internos
  const [fields, setFields] = useState<T>(initialState);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);

  // --- OPTIMIZACIÓN CON REFS ---
  // Guardamos las funciones en refs para que el usuario NO tenga que usar useCallback fuera.
  // El hook siempre usará la versión más reciente sin resetearse.
  const actionRef = useRef(action);
  actionRef.current = action;
  
  const validateRef = useRef(validate);
  validateRef.current = validate;

  // useActionState maneja el estado del servidor (isPending, errores de DB, etc.)
  const [serverState, dispatch, isPending] = useActionState<FormResponse, FormData>(
    async (prevState, formData) => {
      return actionRef.current(prevState, formData);
    },
    { success: null, error: null }
  );

  // --- LÓGICA DE VALIDACIÓN ---
  // validationErrors calcula los errores en tiempo real cada vez que 'fields' cambia.
  const validationErrors = useMemo(() => {
    return validateRef.current ? validateRef.current(fields) : {};
  }, [fields]);

  // isFormValid es lo que usas para el 'disabled' del botón.
  // Si el objeto de errores tiene alguna llave, devuelve false.
  const isFormValid = useMemo(() => {
    return Object.keys(validationErrors).length === 0;
  }, [validationErrors]);

  // displayErrors solo muestra el error si el usuario ya ha interactuado con el campo (touched).
  // Esto evita que el formulario nazca lleno de mensajes rojos.
  const displayErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    for (const key in validationErrors) {
      if (touched[key as keyof T]) {
        errors[key] = validationErrors[key];
      }
    }
    return errors;
  }, [validationErrors, touched]);

  // --- HANDLERS ---
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    // Marcamos como tocado para que displayErrors pueda mostrar el mensaje
    setTouched(prev => prev[name as keyof T] ? prev : { ...prev, [name]: true });
  }, []);

  const handleSubmit = useCallback((formData: FormData) => {
    // Doble check por seguridad antes de disparar la acción
    const currentErrors = validateRef.current ? validateRef.current(fields) : {};
    if (Object.keys(currentErrors).length > 0) {
      const markAllTouched = Object.keys(fields).reduce((acc, key) => ({
        ...acc, [key]: true
      }), {});
      setTouched(markAllTouched as any);
      return;
    }

    startTransition(() => {
      dispatch(formData);
    });
  }, [fields, dispatch]);

  const resetForm = useCallback(() => {
    setFields(initialState);
    setTouched({} as any);
  }, [initialState]);

  return {
    fields,
    errors: displayErrors, 
    touched,
    isPending,
    isFormValid,
    serverState,
    handleChange,
    handleSubmit,
    resetForm
  };
}