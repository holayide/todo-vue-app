<script setup>
import { useRouter } from "vue-router";
import { Home } from "lucide-vue-next"; // Vue version of lucide-react

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4"
  >
    <div class="text-center max-w-md mx-auto">
      <p
        class="text-base font-semibold tracking-wider text-slate-600 dark:text-slate-300"
      >
        SEEMS LIKE YOU ARE LOST
      </p>

      <h1
        class="text-[100px] sm:text-[200px] tracking-widest font-bold text-slate-800 dark:text-slate-100 mb-4"
      >
        404
      </h1>

      <p class="text-base text-slate-600 dark:text-slate-300 mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>

      <!-- Normal button instead of Shadcn Button -->
      <button
        @click="goHome"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
      >
        <Home class="w-4 h-4 text-black" />
        <span class="text-black">Home</span>
      </button>
    </div>
  </div>
</template>
