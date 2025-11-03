import { login, signup } from '@/services/user.service'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  id: number
  email: string
  role: string
  token?: string
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user, // <-- computed from state
  },
  actions: {
    async loginUser(email: string, password: string) {
      this.user = await login(email, password);
    },
    async signUserup(email: string, password: string, role: string) {
      this.user = await signup(email, password, role);
    },
    logout() {
      this.user = null;
    },
  },
  persist: true, // keeps `user` across page reloads
});


