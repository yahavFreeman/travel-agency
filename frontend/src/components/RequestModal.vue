<template>
  <div @click="handleRequestModalToggle" class="fixed inset-0 z-10">
    <div class="absolute inset-0 bg-black/70"></div>
    <transition name="modal-pop" appear>
      <div class="relative z-20 flex items-center justify-center min-h-screen">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md" @click.stop>
          <h2 class="text-xl font-bold mb-4">New Request</h2>
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <div>
              <label class="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                v-model="startDate"
                class="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">End Date</label>
              <input
                type="date"
                v-model="endDate"
                class="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">Reason</label>
              <textarea
                v-model="reason"
                class="border rounded px-3 py-2 w-full"
                rows="3"
              ></textarea>
            </div>
            <button
              type="submit"
			  @click.stop
              class="bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequestStore } from '../stores/request'

const requestStore = useRequestStore()
const startDate = ref('')
const endDate = ref('')
const reason = ref('')

const emit = defineEmits<{
  (e: 'submit', data: { startDate: string; endDate: string; reason?: string }): void
  (e: 'close'): void
}>()

const handleSubmit = () => {
  emit('submit', {
	startDate: startDate.value,
	endDate: endDate.value,
	reason: reason.value,
  })
  emit('close')
}

const handleRequestModalToggle = () => {
  emit('close')
}
</script>

<style>
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: translateY(-60vh) scale(0.95);
}
.modal-pop-enter-to,
.modal-pop-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
