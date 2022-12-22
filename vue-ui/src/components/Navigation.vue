<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        DjClient
      </router-link>
      <button
        type="button"
        @click="toggleNavbar"
        class="navbar-toggler"
        aria-label="Toggle navigation"
        :class="{ collapsed: !navbarExpanded }"
        :aria-expanded="navbarExpanded ? 'true' : 'false'"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        @click="toggleNavbar"
        class="collapse navbar-collapse"
        :class="{ show: navbarExpanded }"
      >
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{ name: 'home' }"
            >
              home
            </router-link>
          </li>
          <li v-if="authStore.isAuthenticated" class="nav-item">
            <a @click="logout" class="nav-link" style="cursor: pointer">
              logout
            </a>
          </li>
          <template v-else>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'login' }"
              >
                sign in
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                :to="{ name: 'signup' }"
              >
                sign up
              </router-link>
            </li>
          </template>
        </ul>
        <span class="navbar-text text-light" v-if="authStore.isAuthenticated">
          logged in as <b>{{ authStore.username }}</b>
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import useAuthStore from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const navbarExpanded = ref(false);

const logout = () => {
  authStore.logout();
  router.push({ name: "login", replace: true });
};

const toggleNavbar = () => (navbarExpanded.value = !navbarExpanded.value);
</script>
