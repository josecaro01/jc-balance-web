import { useAuth } from '@features/auth/hooks';
import { HomeIcon, TransactionIcon, SettingIcon } from '@shared/components';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { LogoutIcon } from '../icons';
import jcLogo from '../../../assets/logo/jc_balance_icon.webp';
import type { Role } from '@features/auth/types';



export const Sidebar = () => {
    
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const { pathname } = useLocation(); 
    const [isOpen, setIsOpen] = useState(false);

    const navItems = useMemo(() => [
        { name: t('dashboard'), icon: HomeIcon, path: '/' },
        { name: t('transactions'), icon: TransactionIcon, path: '/transactions' },
        { name: t('settings'), icon: SettingIcon, path: '/settings' },
    ], [t]);

    // 3. Derivamos el título actual de forma eficiente
    const currentTitle = useMemo(() => {
        return navItems.find(item => item.path === pathname)?.name || t('appName');
    }, [pathname, navItems, t]);

    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <>
            <div className='lg:hidden fixed w-full top-0 left-0 h-16 z-70 flex items-center justify-start p-4 bg-page-bg shadow-lg gap-4 flex-nowrap'>
                <button aria-label='menu'
                    onClick={toggleMenu}
                    className=" p-2 bg-primary rounded-lg shadow-lg text-primary-text flex flex-col gap-1.5 justify-center items-center"
                >
                    <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                <img src={jcLogo} alt="JC Balance" width={36} />

                <h3 className="text-lg font-bold tracking-tight">{currentTitle}</h3>
            </div>


            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-80 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-surface text-page-text flex flex-col p-6 border-r border-border z-90
                transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            `}>

                {/* 1. HEADER: Logo dinámico */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="size-10 rounded-xl flex items-center justify-center text-primary-text font-bold shadow-sm shrink-0">
                        <img src={jcLogo} alt="JC Balance" width={48} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">{t('appName')}</h1>
                        <p className="text-xs opacity-60 font-medium">{t('appTagline')}</p>
                    </div>
                </div>

                {/* 2. NAV: Menú de navegación */}
                <nav className="grow">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                                        ${isActive
                                                ? "bg-primary text-primary-text shadow-md"
                                                : "hover:bg-primary/10 hover:text-primary"}`}
                                    >
                                        {/* Icono Placeholder */}
                                        {({ isActive }) => (
                                            <>
                                                <Icon
                                                    width={20}
                                                    height={20}
                                                    className={`transition-colors
                                                    ${isActive
                                                            ? "text-primary-text"
                                                            : "opacity-40"
                                                        }`}
                                                />

                                                <span className="font-semibold">{item.name}</span>
                                            </>
                                        )}

                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3 p-3 bg-card rounded-2xl border border-border shadow-sm ">
                        <div className="size-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-secondary-text text-xs font-bold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold truncate">{user?.name || 'Unknown'}</p>
                            <p className="text-[10px] opacity-60 uppercase font-black tracking-tighter truncate">{user?.roles?.map((role: Role) => role.name.split('_')[1]).join(', ') || 'User'}</p>
                        </div>
                        <button aria-label='logout' type='button' className="ml-auto cursor-pointer" onClick={() => logout.mutate()}>
                            <LogoutIcon width={20} height={20} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};