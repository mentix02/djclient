<template>
  <div class="form-floating">
    <input
      :id="id"
      :name="id"
      :type="type"
      ref="inputEl"
      @blur="onBlur"
      :autocomplete="id"
      :required="required"
      :placeholder="label"
      class="form-control"
      v-model="value.value"
      :class="{ 'is-invalid': value.errors.length > 0 }"
    />
    <label :for="id" class="form-label">{{ label }}</label>
    <ul v-if="value.errors.length > 0" class="invalid-feedback mb-0">
      <li v-for="error in value.errors">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ValueField } from "@/api/types/auth";

const inputEl = ref<HTMLInputElement | null>(null);

interface BSInputProps {
  id: string;
  label: string;
  value: ValueField;
  required?: boolean;
  autoFocus?: boolean;
  onBlur?: () => void;
  type?: "email" | "text" | "password";
}

const props = withDefaults(defineProps<BSInputProps>(), {
  type: "text",
  required: true,
  autoFocus: false,
});

onMounted(() => {
  if (props.autoFocus) inputEl.value?.focus();
});
</script>
