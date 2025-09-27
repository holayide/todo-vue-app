<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { fetchTaskById } from "../services/api";

// Components
import DetailHeader from "../components/features/detail-page/DetailHeader.vue";
// import DetailPageSkeleton from "@/components/features/detail-page/DetailPageSkeleton.vue";
import TaskDetail from "../components/features/detail-page/TaskDetail.vue";
import TaskInfo from "../components/features/detail-page/TaskInfo.vue";

// route param
const route = useRoute();
const id = route.params.id;

// query
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["task", id],
  queryFn: () => fetchTaskById(id),
  enabled: !!id, // only run if id exists
});
</script>

<template>
  <div
    class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
  >
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- error -->
      <div v-if="isError" class="text-center text-red-500">
        Error loading tasks: {{ error?.message }}
      </div>

      <!-- loading -->
      <!-- <DetailPageSkeleton v-else-if="isLoading" /> -->
      <div v-else-if="isLoading">loading...</div>

      <!-- content -->
      <template v-else>
        <DetailHeader :data="data" />

        <div class="pt-6 xs:pt-10 flex flex-col gap-8">
          <TaskDetail :data="data" />
          <TaskInfo :data="data" />
        </div>
      </template>
    </div>
  </div>
</template>
