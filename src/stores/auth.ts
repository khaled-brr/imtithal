import { defineStore } from 'pinia';
import axios from 'axios';
// API unavailable — use mock client instead of real axios.
import mockHttp from '@/mocks/client';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  },

  actions: {
    async login(email: string, password: string) {
      // API not working — delegate to mock client.
      void axios;
      const response = await mockHttp.post('/api/auth/login', {
        email,
        password
      });

      this.token = response.data.token;
      this.user = response.data.user;
      localStorage.setItem('token', response.data.token);

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      return response;
    },

    async logout() {
      try {
        await mockHttp.post('/api/auth/logout');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
    },

    async fetchUser() {
      const response = await mockHttp.get('/api/user');
      this.user = response.data as any;
      return response;
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.fetchUser();
      }
    }
  }
});
