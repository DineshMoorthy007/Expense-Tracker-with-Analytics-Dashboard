import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { clearToken, getToken, getTokenDisplayName, getTokenEmail, isTokenExpired, setToken } from '@/lib/auth';

type AuthContextValue = {
  token: string | null;
  displayName: string | null;
  email: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setAuthToken] = useState<string | null>(() => {
    const storedToken = getToken();
    return storedToken && !isTokenExpired(storedToken) ? storedToken : null;
  });

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      clearToken();
      setAuthToken(null);
    }
  }, [token]);

  useEffect(() => {
    const handleLogout = () => {
      clearToken();
      setAuthToken(null);
    };

    window.addEventListener('expense-tracker:logout', handleLogout);
    return () => window.removeEventListener('expense-tracker:logout', handleLogout);
  }, []);

  const login = (nextToken: string) => {
    setToken(nextToken);
    setAuthToken(nextToken);
  };

  const logout = () => {
    clearToken();
    setAuthToken(null);
  };

  const value: AuthContextValue = {
    token,
    displayName: getTokenDisplayName(token),
    email: getTokenEmail(token),
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}