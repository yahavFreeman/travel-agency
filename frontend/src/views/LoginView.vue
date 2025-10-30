<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-md w-80">
      <h1 class="text-2xl font-semibold text-center mb-6">
        {{hasUser ? 'Welcome Back' : 'Hello Guest'}}
        </h1>
      <template v-if="!userStore.isLoggedIn">
        <form @submit.prevent="handleSignup" class="flex flex-col space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            v-if="!hasUser"
            v-model="role"
            class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Requestor">Requestor</option>
            <option value="Approver">Validator</option>
          </select>
          <button
            type="submit"
            class="bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition"
          >
                    {{hasUser ? 'Login' : 'Sign Up'}}
          </button>
        </form>

        <button @click="hasUser = !hasUser" class="w-full flex justify-center mt-4 text-blue-500 hover:underline cursor-pointer">
           {{hasUser ? 'New to our website? Sign Up' : 'Already have an account? Log In'}}
        </button>
      </template>
      <template v-else>
        <div class="flex flex-col items-center space-y-4">
          <p class="text-center">You are logged in as <strong>{{ userStore.user?.name }}</strong></p>
          <button
            @click="userStore.logout()"
            class="bg-red-500 text-white rounded-lg py-2 px-4 font-medium hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const email = ref("");
const password = ref("");
const role = ref("Requestor");
let hasUser = ref(false);
const userStore = useUserStore();

const handleLogin = async () => {
  await userStore.loginUser(email.value, password.value);
};

const handleSignup = async () => {
  await userStore.signUserup(email.value, password.value, role.value);
};
</script>
