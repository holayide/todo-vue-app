<script setup>
import { inject, ref } from "vue";
import { Sun, Moon } from "lucide-vue-next";

// get provided values
const theme = inject("theme");
const setTheme = inject("setTheme");

const open = ref(false);

function toggleMenu() {
  open.value = !open.value;
}

function selectTheme(newTheme) {
  setTheme(newTheme);
  open.value = false;
}
</script>

<template>
  <div class="relative inline-block text-left">
    <!-- Trigger button -->
    <button
      class="relative inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      @click="toggleMenu"
    >
      <!-- Sun icon -->
      <Sun
        class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <!-- Moon icon -->
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] text-white scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="open"
      class="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
      <div class="py-1">
        <button
          @click="selectTheme('light')"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          Light
        </button>
        <button
          @click="selectTheme('dark')"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          Dark
        </button>
        <button
          @click="selectTheme('system')"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          System
        </button>
      </div>
    </div>
  </div>
</template>
