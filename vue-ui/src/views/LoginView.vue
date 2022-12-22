<template>
  <div class="row">
    <div class="col-lg-12 col-xl-6 offset-xl-3">
      <div class="card">
        <div class="card-title">
          <div class="card-body">
            <h1 class="card-title">Sign In</h1>
            <hr />
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <BSInput
                  auto-focus
                  id="username"
                  label="Username"
                  :value="credentials.username"
                  v-model="credentials.username.value"
                />
              </div>
              <div class="mb-3">
                <BSInput
                  id="password"
                  type="password"
                  label="Password"
                  :value="credentials.password"
                  v-model="credentials.password.value"
                />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import useAuthStore from "@/stores/auth";
import useAlertStore from "@/stores/alert";
import BSInput from "@/components/BSInput.vue";
import { fetchLoginResponse } from "@/api/auth";
import type { Credentials } from "@/api/types/auth";

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const credentials = reactive<Credentials>({
  username: { value: "", errors: [] },
  password: { value: "", errors: [] },
});

const handleSubmit = async () => {
  alertStore.clearMessages();
  try {
    const response = await fetchLoginResponse(credentials);
    authStore.login(response);
    await router.push({ name: "home" });
  } catch (e: any) {
    alertStore.addDangerMessage(e.message);
  }
};
</script>
