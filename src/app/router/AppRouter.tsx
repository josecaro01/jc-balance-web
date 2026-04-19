import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from "@features/auth/pages";
import { useAuth } from "@features/auth/hooks";
import { DashboardPage } from "@features/dashboard/pages";
import { SettingPage } from "@features/settings/pages";
import { TransanctionPage } from "@features/transactions/pages";
import { MainLayout, LoadingComponent } from "@shared/components";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
export const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS: Si ya estoy logueado, me manda al "/" */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* RUTAS PRIVADAS: Si no estoy logueado, me manda al "/login" */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransanctionPage />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>
      </Route>

      {/* Catch-all: Redirige cualquier ruta desconocida */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};



// Solo permite entrar si NO está logueado (Login/Register)
const PublicRoute = () => {
  const { status } = useAuth();
  if (status === 'checking') return <LoadingComponent />;
  return status === 'authenticated' ? <Navigate to="/" replace /> : <Outlet />;
};

// Solo permite entrar si ESTÁ logueado (Dashboard/Transactions/etc)
const PrivateRoute = () => {
  const { status } = useAuth();

  // Aquí es donde brilla tu nuevo componente
  if (status === 'checking') {
    return <LoadingComponent />;
  }

  return status === 'authenticated' ? <Outlet /> : <Navigate to="/login" replace />;
};