<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

import BaseLayout from "@/components/BaseLayout.vue";

export default defineComponent({
  name: "DjClient",
  components: { BaseLayout, RouterView },
});
</script>
