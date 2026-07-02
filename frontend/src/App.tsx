import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from '@/components/Shell';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import { DashboardPage } from '@/pages/DashboardPage';
import { ExpensesPage } from '@/pages/ExpensesPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { SettingsPage } from '@/pages/SettingsPage';

function RedirectToDashboard() {
  return <Navigate to="/dashboard" replace />;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Shell />}>
              <Route path="/" element={<RedirectToDashboard />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}