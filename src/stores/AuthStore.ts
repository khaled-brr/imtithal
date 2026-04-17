import { defineStore } from 'pinia';
import http from '@/plugins/axios';
import { ENUMS } from '@/config';
// API unavailable — use mock client instead of real http.
import mockHttp from '@/mocks/client';
// import vuetify from '@/plugins/vuetify';
// import i18n, { type Locale } from '@/plugins/i18n';
// import API from '@/services/api';

export interface User {
  name: string;
  sa_id: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('AuthStore', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token')
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    }
  },

  actions: {
    async login(sa_id: string, password: string) {
      // API not working — delegate to mock client.
      void http;
      const response = await mockHttp.post('auth/login', { sa_id, password });

      if (response.data?.token) {
        this.setToken(response.data.token);
        this.setUser(response.data.user);
      }

      return response;
    },

    async logout() {
      try {
        if (this.token) {
          await mockHttp.post('auth/logout');
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.clearAuth();
      }
    },

    setToken(token: string | null) {
      this.token = token;
      if (token) {
        localStorage.setItem('token', token);
        mockHttp.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        localStorage.removeItem('token');
        delete mockHttp.defaults.headers.common.Authorization;
      }
    },

    setUser(user: User | null) {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },

    clearAuth() {
      this.setToken(null);
      this.setUser(null);
      // Optional: Redirect to login page
      window.location.href = '/auth/login';
    },

    initAuth() {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token) {
        this.setToken(token);
      }

      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.setUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
          this.clearAuth();
        }
      }
    }
  }
});
