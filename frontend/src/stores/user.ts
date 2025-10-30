import { login, signup } from '@/services/user.service'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  id: number
  email: string
  role: string
  token?: string
}

export const useUserStore = defineStore('user', () => {
  // --- State ---
  const user = ref<User | null>(null)

  // --- Actions ---
  const loginUser = async (email: string, password: string, ) => {
    user.value = await login(email, password)
  }

  const signUserup = async (email: string, password: string, role: string) => {
    user.value = await signup(email, password, role)
  }

  const logout = () => {
    user.value = null
  }

  // --- Getters ---
  const isLoggedIn = computed(() => !!user.value)

  return { user, isLoggedIn, login, logout }
})
