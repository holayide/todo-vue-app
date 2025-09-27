<script setup>
import { provide, ref, watch, onMounted } from "vue";

const props = defineProps({
  defaultTheme: {
    type: String,
    default: "system",
  },
  storageKey: {
    type: String,
    default: "vite-ui-theme",
  },
});

const theme = ref(localStorage.getItem(props.storageKey) || props.defaultTheme);

function setTheme(newTheme) {
  localStorage.setItem(props.storageKey, newTheme);
  theme.value = newTheme;
}

// ⚡ apply theme changes to <html>
watch(
  theme,
  (newTheme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (newTheme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(newTheme);
    }
  },
  { immediate: true }
);

provide("theme", theme);
provide("setTheme", setTheme);
</script>

<template>
  <slot />
</template>
