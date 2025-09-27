<script setup>
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

// import CardSkeleton from "./CardSkeleton.vue";
// import { useTasksQueryOptions } from "../services/queryOptions";
import { useTasksQueryOptions } from "../../../services/queryOptions";

import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-vue-next";

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
});

const { data, isLoading, isError, error } = useQuery(
  useTasksQueryOptions({ page: props.page })
);

const tasks = computed(() => data.value?.data || []);
const totalTasks = computed(() => tasks.value.length);
const completedTasks = computed(
  () => tasks.value.filter((todo) => todo.status === "DONE").length
);
const pendingTasks = computed(
  () => tasks.value.filter((todo) => todo.status !== "DONE").length
);
const highPriorityTasks = computed(
  () => tasks.value.filter((todo) => todo.priority === "HIGH").length
);
</script>

<template>
  <div>
    <!-- error -->
    <div v-if="isError" class="text-center text-red-500">
      Error loading tasks: {{ error?.message }}
    </div>

    <!-- loading skeleton -->
    <div
      v-else-if="isLoading"
      class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
    >
      <!-- <CardSkeleton v-for="i in 4" :key="i" /> -->
      <div>loading...</div>
    </div>

    <!-- loaded cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <!-- Total tasks -->
      <div
        class="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4"
      >
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Calendar class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Tasks
            </p>
            <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {{ totalTasks }}
            </p>
          </div>
        </div>
      </div>

      <!-- Completed -->
      <div
        class="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4"
      >
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
              Completed
            </p>
            <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {{ completedTasks }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pending -->
      <div
        class="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4"
      >
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-orange-100 rounded-lg">
            <Clock class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
              Pending
            </p>
            <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {{ pendingTasks }}
            </p>
          </div>
        </div>
      </div>

      <!-- High Priority -->
      <div
        class="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-4"
      >
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-red-100 rounded-lg">
            <AlertCircle class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
              High Priority
            </p>
            <p class="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {{ highPriorityTasks }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
