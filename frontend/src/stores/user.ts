import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  id: number
  email: string
  name: string
  token?: string
}

export const useUserStore = defineStore('user', () => {
  // --- State ---
  const user = ref<User | null>(null)

  // --- Actions ---
  const login = async (email: string, password: string) => {
    // TODO: replace with real backend call later
    console.log('Logging in with:', email, password)

    // Simulate successful login
    user.value = {
      id: 1,
      email,
      name: 'Yahav Freeman',
      token: 'fake-jwt-token',
    }
  }

  const logout = () => {
    user.value = null
  }

  // --- Getters ---
  const isLoggedIn = computed(() => !!user.value)

  return { user, isLoggedIn, login, logout }
})
