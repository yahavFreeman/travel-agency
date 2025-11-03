<template>
  <div class="p-4 w-full h-full flex flex-col justify-center items-center">
    <div class="w-full relative mb-4">
      <h1 class="text-2xl font-bold align-self-center justify-self-center">
        {{ user.email }}'s Requests
      </h1>
      <button
        @click="toggleModal"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-lg py-1 px-2 font-medium hover:bg-blue-600 transition cursor-pointer"
      >
        <span class="hidden sm:inline-flex">Add</span> 
        <span class="hidden xs:inline-flex">New</span> 
         Request
      </button>
    </div>
    <EasyDataTable
      :headers="headers"
      :items="formattedRequests"
      :theme="'light'"
      header-text-direction="center"
      body-text-direction="center"
      class="mb-8 w-full max-w-5xl max-h-[600px] overflow-y-auto"
    >
      <template #item-status="{ status }">
        <span :class="statusColor(status)">{{ status }}</span>
      </template>
    </EasyDataTable>
  </div>
  <RequestModal @submit="handleRequestSubmission" @close="toggleModal" v-if="isModalOpen" />
</template>

<script setup lang="ts">
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { useRequestStore } from '../stores/request'
import { useUserStore } from '../stores/user'
import { onMounted, computed, ref } from 'vue'
import RequestModal from '../components/RequestModal.vue'

const requestStore = useRequestStore()
const userStore = useUserStore()
const formattedRequests = computed(() => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return requestStore.requests.map(r => ({
    ...r,
    createdAt: r.createdAt ? formatter.format(new Date(r.createdAt)) : null,
    updatedAt:
      r.updatedAt && r.updatedAt !== r.createdAt
        ? formatter.format(new Date(r.updatedAt))
        : null
  }))
})
const user = computed(() => userStore.user)

const isModalOpen = ref(false)

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'User ID', value: 'userId' },
  { text: 'Readon', value: 'reason' },
  { text: 'Status', value: 'status' },
  { text: 'Requested On', value: 'createdAt' },
  { text: 'Responded On', value: 'updatedAt' },
]

const statusColor = (status: string) => {
  if (status === 'pending') return 'bg-yellow-200 text-yellow-800 px-2 py-1 rounded'
  if (status === 'confirmed') return 'bg-green-200 text-green-800 px-2 py-1 rounded'
  if (status === 'rejected') return 'bg-red-200 text-red-800 px-2 py-1 rounded'
  return ''
}

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleRequestSubmission = async (data: {
  startDate: string
  endDate: string
  reason?: string
}) => {
  await requestStore.addRequest({
    userId: user.value?.id!,
    startDate: data.startDate,
    endDate: data.endDate,
    reason: data.reason,
  })
}

onMounted(() => {
  requestStore.getRequestsForUser(user.value?.id)
})
</script>

<style>
.easy-data-table__cell {
  text-align: center; /* center horizontally */
  vertical-align: middle; /* center vertically */
}
.easy-data-table__header {
  text-align: center; /* also center headers */
  vertical-align: middle;
}
</style>
