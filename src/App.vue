<script setup lang="ts">
import { Toaster } from "vue-sonner";
import ThemeProvider from "./context/modeContext.vue";
</script>

<template>
  <ThemeProvider>
    <RouterView />
    <!--   richColors -->
    <Toaster
      position="top-right"
      richColors
      theme="dark"
      :toastOptions="{
        class: 'fixed top-4 right-4',
        style: { borderRadius: '8px', padding: '12px 16px', color: '#fff' },
        classNames: {
          toast: 'rounded-lg px-4 py-3 shadow-lg text-white',
          success: 'bg-green-600',
          error: 'bg-red-600',
          loading: 'bg-blue-600',
        },
      }"
    />
  </ThemeProvider>
</template>
