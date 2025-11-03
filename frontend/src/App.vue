<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const router = useRouter()

const logout = () => {
  userStore.logout();
  router.push('/');
}
</script>

<template>
  <header class="wrapper pt-2 px-4 flex items-center justify-between">
      <template v-if="userStore.isLoggedIn">
        <button
          @click="logout()"
          class="bg-red-200 text-white rounded-lg py-1 px-2 font-medium hover:bg-red-300 transition cursor-pointer"
        >
          Log Out
        </button>
      </template>
      <template v-else>
      <RouterLink to="/">
        {{userStore.isLoggedIn ? `Welcome, ${userStore.user?.name}` : 'Login'}}
      </RouterLink>
      </template>
      <!-- <nav>
      </nav> -->
  </header>

  <RouterView />
</template>




<style scoped/>