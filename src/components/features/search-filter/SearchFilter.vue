<!-- <script setup lang="ts">
Props
const props = defineProps<{
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
}>();

Emits
const emit = defineEmits([
  "update:searchQuery",
  "update:statusFilter",
  "update:priorityFilter",
]);
</script>

<template>
  <div>
    Card
    <div
      class="py-2 border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700 rounded-xl"
    >
      <div class="p-6">
        <div class="flex flex-col md:flex-row gap-4">
          Search Input
          <div class="flex-1 relative rounded-md bg-slate-50 dark:bg-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z"
              />
            </svg>
            <input
              id="search"
              :value="props.searchQuery"
              @input="emit('update:searchQuery', $event.target.value)"
              placeholder="Search tasks..."
              class="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md bg-transparent outline-none"
            />
          </div>

          Filters
          <div class="flex gap-3">
            Status Filter
            <select
              :value="props.statusFilter"
              @change="emit('update:statusFilter', $event.target.value)"
              class="w-[140px] px-3 py-2 text-sm rounded-md border border-slate-200 cursor-pointer bg-slate-50 dark:bg-slate-700"
            >
              <option value="all">All Status</option>
              <option value="TODO">Pending</option>
              <option value="DONE">Completed</option>
            </select>

            Priority Filter
            <select
              :value="props.priorityFilter"
              @change="emit('update:priorityFilter', $event.target.value)"
              class="w-[140px] px-3 py-2 text-sm rounded-md border border-slate-200 cursor-pointer bg-slate-50 dark:bg-slate-700"
            >
              <option value="all">All Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
// Props
// const props = defineProps({
//   searchQuery: String,
//   statusFilter: String,
//   priorityFilter: String,
// });
const props = defineProps({
  statusFilter: String,
  priorityFilter: String,
  searchQuery: String,
});

// Emits
// const emit = defineEmits([
//   "update:searchQuery",
//   "update:statusFilter",
//   "update:priorityFilter",
// ]);
const emit = defineEmits([
  "update:statusFilter",
  "update:priorityFilter",
  "update:searchQuery",
]);

// Handler functions
const handleSearchInput = (event) => {
  emit("update:searchQuery", event.target.value);
};

const handleStatusChange = (event) => {
  emit("update:statusFilter", event.target.value);
};

const handlePriorityChange = (event) => {
  emit("update:priorityFilter", event.target.value);
};
</script>

<template>
  <div>
    <!-- Card -->
    <div
      class="py-2 border-0 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700 rounded-xl"
    >
      <div class="p-6">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1 relative rounded-md bg-slate-50 dark:bg-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-1.85z"
              />
            </svg>
            <input
              id="search"
              :value="searchQuery"
              @input="handleSearchInput"
              placeholder="Search tasks..."
              class="w-full pl-10 pr-3 py-2 text-sm border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md bg-transparent outline-none"
            />
          </div>

          <!-- Filters -->
          <div class="flex gap-3">
            <!-- Status Filter -->
            <select
              :value="statusFilter"
              @change="handleStatusChange"
              class="w-[140px] px-3 py-2 text-sm rounded-md border border-slate-200 cursor-pointer bg-slate-50 dark:bg-slate-700"
            >
              <option value="all">All Status</option>
              <option value="TODO">Pending</option>
              <option value="DONE">Completed</option>
            </select>

            <!-- Priority Filter -->
            <select
              :value="priorityFilter"
              @change="handlePriorityChange"
              class="w-[140px] px-3 py-2 text-sm rounded-md border border-slate-200 cursor-pointer bg-slate-50 dark:bg-slate-700"
            >
              <option value="all">All Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
