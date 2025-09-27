<script setup>
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

import Cards from "../components/features/summay-card/Cards.vue";

import HomeHeader from "../components/features/home-header/HomeHeader.vue";
import SearchFilter from "../components/features/search-filter/SearchFilter.vue";
import TodoCard from "../components/features/todo-cards/TodoCard.vue";
import Pagination from "../components/features/pagination/Pagination.vue";

import { useDebounce } from "../hooks/debounce";
import { useTasksQueryOptions } from "../services/queryOptions.js";

const page = ref(1);
const searchQuery = ref("");
const statusFilter = ref("all");
const priorityFilter = ref("all");

const debouncedSearch = useDebounce(searchQuery, 500);
const isSearching = computed(() => debouncedSearch.value.trim().length > 0);

// query
const queryOptions = computed(() =>
  useTasksQueryOptions({
    page: page.value,
    name: debouncedSearch.value,
    status: statusFilter.value === "all" ? "" : statusFilter.value,
    priority: priorityFilter.value === "all" ? "" : priorityFilter.value,
  })
);

const { data, isLoading, isError, error } = useQuery(queryOptions);

const filteredTasks = computed(() => {
  const tasks = data.value?.data || [];

  // apply search, status, and priority filters
  return tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(debouncedSearch.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" || task.status === statusFilter.value;

    const matchesPriority =
      priorityFilter.value === "all" || task.priority === priorityFilter.value;

    return matchesSearch && matchesStatus && matchesPriority;
  });
});

function handlePageChange(newPage) {
  page.value = newPage;
}
</script>

<template>
  <div class="my-container mb-8">
    <HomeHeader />
    <Cards :page="page" />

    <SearchFilter
      v-model:statusFilter="statusFilter"
      v-model:priorityFilter="priorityFilter"
      v-model:searchQuery="searchQuery"
    />

    <div class="mt-14 min-h-[200px]">
      <!-- error -->
      <div v-if="isError" class="text-center text-red-500">
        Error loading tasks: {{ error?.message }}
      </div>

      <!-- loading skeletons -->
      <div
        v-else-if="isLoading"
        class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <!-- <TodoCardSkeleton v-for="i in 6" :key="i" /> -->
        loading...
      </div>

      <!-- loaded tasks -->
      <template v-else>
        <div
          v-if="filteredTasks.length === 0"
          class="mt-14 text-center text-gray-500 dark:text-gray-400"
        >
          <p v-if="isSearching">No tasks found matching "{{ searchQuery }}"</p>
          <p v-else>No tasks available</p>
        </div>

        <template v-else>
          <div
            class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <TodoCard
              v-for="todo in filteredTasks"
              :key="todo.id"
              :todo="todo"
            />
          </div>

          <div v-if="!isSearching" class="mt-14">
            <Pagination :data="data" @page-change="handlePageChange" />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
