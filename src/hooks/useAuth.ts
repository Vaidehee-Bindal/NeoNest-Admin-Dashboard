import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const authenticated = authAPI.isAuthenticated();
    const adminData = authAPI.getAdmin();
    setIsAuthenticated(authenticated);
    setAdmin(adminData);
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
