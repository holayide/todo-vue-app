<script setup>
import { priorityColors } from "../../../lib/helpers";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Normalize priority
const priority = props.data.priority?.toLowerCase() || "low";
const priorityClasses =
  priorityColors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
</script>

<template>
  <div class="lg:col-span-2 space-y-6">
    <div
      class="border-0 shadow-sm rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700"
    >
      <!-- Header -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- Title -->
            <h2
              class="max-w-[816px] text-2xl mb-2 break-words whitespace-pre-wrap font-bold"
              :class="
                props.data.status === 'DONE'
                  ? 'line-through text-slate-500 dark:text-slate-400'
                  : 'text-slate-900 dark:text-slate-100'
              "
            >
              {{ props.data.name }}
            </h2>

            <!-- Badges -->
            <div class="flex items-center space-x-3">
              <span
                class="px-2 py-1 rounded text-sm font-medium border"
                :class="priorityClasses"
              >
                {{ priority }} priority
              </span>

              <span
                v-if="props.data.status === 'DONE'"
                class="px-2 py-1 rounded text-sm font-medium border bg-green-100 text-green-800 border-green-200"
              >
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <div class="prose prose-slate max-w-none">
          <h4
            class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3"
          >
            Description
          </h4>
          <p
            class="text-slate-700 dark:text-slate-300 leading-relaxed break-words whitespace-pre-wrap"
            :class="
              props.data.status === 'DONE' ? 'line-through opacity-75' : ''
            "
          >
            {{ props.data.description || props.data.name || "No description" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
