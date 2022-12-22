<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-xl-6 offset-xl-3">
        <br />
        <template v-if="alertStore.hasMessages">
          <div
            class="alert alert-dismissible"
            :class="'alert-' + alert.type"
            v-for="(alert, idx) in alertStore.messages"
          >
            <button
              type="button"
              class="btn-close"
              @click="alertStore.removeMessage(idx)"
            />
            {{ alert.message }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAlertStore from "@/stores/alert";

const alertStore = useAlertStore();
</script>
