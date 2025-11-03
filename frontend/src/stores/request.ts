import { getRequestsForUser, submitRequest } from '@/services/request.service'
import { defineStore } from 'pinia'

export interface Request {
  id: number
  userId: number
  startDate: string
  endDate: string
  reason?: string
  status: string
  createdAt: string
  updatedAt: string
}

export const useRequestStore = defineStore('request', {
  state: () => ({
    requests: [] as Request[],
  }),
  getters: {
  },
  actions: {
    async getRequestsForUser(userId: number) {
      // Replace with real API call or use mock data for demo
      // this.requests = await getRequestsForUser(userId)
      const now = new Date().toISOString()
      this.requests = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        userId,
        startDate: now,
        endDate: now,
        reason: i % 2 ? 'Flight reservation' : 'Hotel booking',
        status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'confirmed' : 'rejected',
        createdAt: now,
        updatedAt: now,
      }))
    },

    async addRequest(newRequest: Omit<Request, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
      // Replace with real API call or use mock for demo
      const now = new Date().toISOString()
      const request: Request = {
        id: Date.now(),
        userId: newRequest.userId,
        startDate: newRequest.startDate,
        endDate: newRequest.endDate,
        reason: newRequest.reason,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      }
      this.requests.push(request)
    },
  },
  persist: true, // saves to localStorage automatically
})
