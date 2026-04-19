import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-page-bg">
            {/* 1. El Sidebar se queda "anclado" a la izquierda */}
            <Sidebar />

            <main className={`
                transition-all duration-300
                lg:pl-64 
                w-full min-h-screen
            `}>

                <div className="p-4 pt-20 lg:p-8 lg:pt-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};