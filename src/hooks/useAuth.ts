import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = authAPI.getToken();
    if (token) {
      // Verify token with backend
      const result = await authAPI.verify();
      if (result && result.admin) {
        setIsAuthenticated(true);
        setAdmin(result.admin);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
      }
    } else {
      setIsAuthenticated(false);
      setAdmin(null);
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const result = await authAPI.login(email, password);
    setIsAuthenticated(true);
    setAdmin(result.admin);
    return result;
  };

  const logout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
  };
}
