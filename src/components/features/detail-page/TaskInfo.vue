<template>
  <div
    class="border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700 rounded-lg"
  >
    <!-- Header -->
    <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
      <h3 class="text-lg font-semibold">Task Information</h3>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-4">
      <!-- Created -->
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-purple-100 rounded-lg">
          <ClockIcon class="w-4 h-4 text-purple-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
            Created
          </p>
          <p class="text-sm text-slate-900 dark:text-slate-100">
            {{ formatDate(data.createdAt) }}
          </p>
        </div>
      </div>

      <!-- Updated -->
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <CalendarIcon class="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
            Updated Date
          </p>
          <p class="text-sm text-slate-900 dark:text-slate-100">
            {{ formatDate(data.updatedAt) }}
          </p>
        </div>
      </div>

      <!-- Status -->
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-green-100 rounded-lg">
          <UserIcon class="w-4 h-4 text-green-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
            Status
          </p>
          <p class="text-sm text-slate-900 dark:text-slate-100">
            {{ data.status === "DONE" ? "Completed" : "In Progress" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatDate } from "../../../lib/helpers";

// lucide-vue-next icons
import {
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
} from "lucide-vue-next";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
