<script setup lang="ts">
import { RouterLink } from "vue-router";
import { AlertTriangle } from "lucide-vue-next";

import ThemeToggle from "../../ui/ThemeToggle.vue";
import NewTaskBtn from "../new-task/NewTaskBtn.vue";
</script>

<template>
  <div>
    <!-- Header -->
    <div class="xs:flex items-center justify-between mb-8 xs:mb-6">
      <div>
        <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          My Tasks
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Organize and track your daily tasks efficiently
        </p>
      </div>

      <div class="flex items-center space-x-3 mt-3 xs:mt-0">
        <ThemeToggle />
        <NewTaskBtn />
      </div>
    </div>

    <!-- Floating error test button -->
    <RouterLink
      to="/test-err"
      class="fixed bottom-6 right-6 z-50 group"
      aria-label="Test Error Boundary"
    >
      <div
        class="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors"
      >
        <AlertTriangle class="w-5 h-5 text-white" />
      </div>

      <div
        class="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
      >
        Test Error Boundary
      </div>
    </RouterLink>
  </div>
</template>
