<template>
  <Navigation />
  <Alerts />
  <main class="container">
    <slot />
  </main>
</template>

<script setup lang="ts">
import Alerts from "@/components/Alerts.vue";
import Navigation from "@/components/Navigation.vue";
</script>
