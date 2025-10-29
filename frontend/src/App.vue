<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { RouterLink, RouterView } from 'vue-router'

const userStore = useUserStore();
</script>

<template>
<div class="bg-gray-100">
  <header>

    <div class="wrapper pt-2 px-4 flex items-center justify-between">
      <template v-if="userStore.isLoggedIn">
        <button
          @click="userStore.logout()"
          class="bg-red-200 text-white rounded-lg py-1 px-2 font-medium hover:bg-red-300 transition"
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
    </div>
  </header>

  <RouterView />
</div>
</template>




<style scoped/>