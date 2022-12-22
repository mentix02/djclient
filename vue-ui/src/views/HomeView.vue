<template>
  <div class="p-5 mb-4 bg-light text-dark rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Django &times; Vue</h1>
      <div class="col-xl-8 fs-4 my-3 py-2">
        DjClient is a full-stack web application built with Django and Vue. It
        uses the Django REST Framework to provide a RESTful API for the
        frontend, which is built with Vue and TypeScript.
        <hr />
        Includes a simple authentication system, with user registration, login,
        and logout.
      </div>
      <router-link
        class="btn btn-primary btn-lg"
        :to="{ name: 'signup' }"
        v-if="!authStore.isAuthenticated"
      >
        Get Started &rarr;
      </router-link>
      <button v-else disabled class="btn btn-outline-primary btn-lg">
        Logged in as <b>{{ authStore.username }}</b>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import useAuthStore from "@/stores/auth";

const authStore = useAuthStore();
</script>
