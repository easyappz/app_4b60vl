import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      refreshMe();
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { token: tkn, user: usr } = await authApi.login({ email, password });
      localStorage.setItem('token', tkn);
      setToken(tkn);
      setUser(usr);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { token: tkn, user: usr } = await authApi.register(payload);
      localStorage.setItem('token', tkn);
      setToken(tkn);
      setUser(usr);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  const refreshMe = async () => {
    if (!token) return;
    try {
      const me = await authApi.me();
      setUser(me);
    } catch (e) {
      // token invalid
      logout();
    }
  };

  const value = useMemo(() => ({
    token,
    user,
    setUser,
    loading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    refreshMe,
  }), [token, user, loading]);

  return (
    <div data-easytag="id1-src/hooks/useAuth.js">
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
