<template>
  <div class="row">
    <div class="col-lg-12 col-xl-6 offset-xl-3">
      <div class="card">
        <div class="card-body">
          <h1 class="card-title">Sign Up</h1>
          <hr />
          <form class="row" @submit.prevent="handleSubmit">
            <div class="col-6 mb-3">
              <BSInput
                auto-focus
                id="firstName"
                label="First Name"
                :value="userData.first_name"
                v-model="userData.first_name.value"
              />
            </div>
            <div class="col-6 mb-3">
              <BSInput
                id="lastName"
                label="Last Name"
                :value="userData.last_name"
                v-model="userData.last_name.value"
              />
            </div>
            <div class="col-12 mb-3">
              <BSInput
                id="email"
                type="email"
                label="Email"
                :value="userData.email"
                v-model="userData.email.value"
              />
            </div>
            <div class="col-12 mb-3">
              <BSInput
                id="username"
                label="Username"
                :value="userData.username"
                :on-blur="handleUsernameBlur"
                v-model="userData.username.value"
              />
            </div>
            <div class="col-12 mb-3">
              <BSInput
                id="password"
                type="password"
                label="Password"
                :value="userData.password"
                v-model="userData.password.value"
              />
            </div>

            <div class="d-grid">
              <button type="submit" class="btn btn-primary btn-lg">
                Register Now
              </button>
            </div>
          </form>
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
import { isUserRegisterError } from "@/api/types/auth";
import type { UserRegisterData } from "@/api/types/auth";
import {
  fetchRegisterResponse,
  fetchUsernameAvailableResponse,
} from "@/api/auth";

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const userData = reactive<UserRegisterData>({
  email: { value: "", errors: [] },
  username: { value: "", errors: [] },
  password: { value: "", errors: [] },
  last_name: { value: "", errors: [] },
  first_name: { value: "", errors: [] },
});

const handleSubmit = async () => {
  // reset errors for all fields to empty arrays
  Object.entries(userData).forEach(([_, value]) => {
    value.errors = [];
  });

  try {
    const response = await fetchRegisterResponse(userData);
    authStore.login(response);
    await router.push({ name: "home" });
  } catch (e: any) {
    if (isUserRegisterError(e)) {
      Object.entries(e).forEach(([key, errors]) => {
        userData[key].errors = errors as string[];
      });
    } else {
      alertStore.addDangerMessage(e.message);
    }
  }
};

const handleUsernameBlur = async () => {
  const username = userData.username.value;
  if (username.length === 0) return;

  try {
    const response = await fetchUsernameAvailableResponse(username);
    if (!response.available) {
      userData.username.errors = ["Username is already taken"];
    } else {
      userData.username.errors = [];
    }
  } catch (e: any) {
    alertStore.addDangerMessage(e.message);
  }
};
</script>
