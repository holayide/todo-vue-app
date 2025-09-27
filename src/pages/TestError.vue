<script setup>
import { ref, onErrorCaptured } from "vue";
import TestError from "./TestError.vue";

const error = ref(null);

onErrorCaptured((err) => {
  error.value = err.message;
  return false;
});
</script>

<template>
  <div>
    <h1>Error Boundary Test</h1>
    <div v-if="error" class="text-red-500">Caught error: {{ error }}</div>
    <div v-else>
      <TestError />
    </div>
  </div>
</template>
