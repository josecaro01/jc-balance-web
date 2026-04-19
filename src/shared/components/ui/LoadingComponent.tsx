import { useTranslation } from 'react-i18next';

export const LoadingComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-page-bg">
      {/* Contenedor con animación de entrada y pulso suave */}
      <div className="flex flex-col items-center">
        
        {/* Tu Logo con una animación de pulso personalizada */}
        <div className="relative mb-4 animate-pulse">
            <h1 className="text-4xl font-bold text-page-text tracking-tight">
                {t('appName')}
            </h1>
            {/* Línea decorativa animada debajo del nombre */}
            <div className="h-1 w-full bg-linear-to-r from-transparent via-page-text/30 to-transparent mt-1" />
        </div>

        {/* Tagline con un efecto de "escritura" o fade-in pausado */}
        <p className="text-sm text-page-text/60 animate-bounce duration-2000">
            {t('appTagline')}
        </p>

        {/* Spinner minimalista opcional */}
        <div className="mt-8">
          <div className="h-8 w-8 border-4 border-page-text/10 border-t-page-text rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};