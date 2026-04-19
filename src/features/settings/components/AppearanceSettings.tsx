import { ButtonComponent, MoonIcon, SunIcon,  } from "@shared/components";
import { useTheme } from "@shared/hooks";
import { useTranslation } from "react-i18next";

export const AppearanceSettings = () => {
   const { t } = useTranslation();
    const { theme, setTheme } = useTheme();

    return (
        <section className="p-6 rounded-2xl border border-border shadow-sm bg-card space-y-4">
            <h2 className="text-lg font-bold tracking-tight">{t('appearance')}</h2>
            <p className="text-sm text-slate-500">{t('themeDescription')}</p>
            <div className="flex gap-4 items-center">
                <ButtonComponent 
                    colorScheme='primary' 
                    variant={theme === 'light' ? 'filled' : 'outlined'} 
                    icon={SunIcon} 
                    children={t('light')} 
                    onClick={() => setTheme('light')} 
                />
                <ButtonComponent 
                    colorScheme='primary' 
                    variant={theme === 'dark' ? 'filled' : 'outlined'} 
                    icon={MoonIcon} 
                    children={t('dark')} 
                    onClick={() => setTheme('dark')} 
                />
            </div>
        </section>
    );
}