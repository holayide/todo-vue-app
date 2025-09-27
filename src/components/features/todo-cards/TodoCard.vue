<script setup>
import { computed } from "vue";
import { useToggleTodo } from "../../../services/queries";
import { formatDate, priorityColors } from "../../../lib/helpers";
import EditTaskBtn from "../edit-task/EditTaskBtn.vue";
import DeleteTask from "../delete-task/DeleteTask.vue";

import {
  CheckCircle2,
  Circle,
  Calendar,
  Eye,
  Trash2,
  Edit,
} from "lucide-vue-next";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const { mutate: toggleStatus, isPending } = useToggleTodo();

const status = computed(() => props.todo.status.toLowerCase());
const priority = computed(() => props.todo.priority.toLowerCase());

const priorityClasses = computed(() => {
  return (
    priorityColors[priority.value] ||
    "bg-gray-100 text-gray-800 border-gray-200"
  );
});

function handleToggle() {
  toggleStatus({ id: props.todo.id, status: props.todo.status });
}
</script>

<template>
  <div
    class="rounded-lg border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-800 dark:border-slate-700"
    :class="{ 'opacity-75': status === 'done' }"
  >
    <!-- Header -->
    <div class="px-6 pt-4 pb-3">
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-3 flex-1">
          <button
            @click="handleToggle"
            class="p-0 h-auto hover:bg-transparent cursor-pointer"
          >
            <div
              v-if="isPending"
              class="w-4 h-4 animate-spin rounded-full border-2 border-t-transparent border-slate-400"
            />
            <CheckCircle2
              v-else-if="status === 'done'"
              class="w-4 h-5 text-green-600"
            />
            <Circle
              v-else
              class="w-5 h-5 text-slate-400 hover:text-slate-600"
            />
          </button>

          <div class="w-5 flex-1 min-w-0">
            <h3
              class="font-semibold text-slate-900 dark:text-slate-100 truncate"
              :class="{
                'line-through text-slate-500 dark:text-slate-400':
                  status === 'done',
              }"
            >
              {{ props.todo.name }}
            </h3>
          </div>
        </div>

        <span
          class="ml-1 text-xs px-2 py-0.5 rounded border"
          :class="priorityClasses"
        >
          {{ priority }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="px-6 pt-0 pb-4">
      <p
        class="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 whitespace-pre-wrap break-words"
        :class="{ 'line-through': status === 'done' }"
      >
        {{ props.todo.description || props.todo.name || "No description" }}
      </p>

      <div class="flex items-center justify-between">
        <div
          class="flex items-center text-xs text-slate-500 dark:text-slate-400"
        >
          <Calendar class="w-3 h-3 mr-1" />
          {{ formatDate(props.todo.createdAt) }}
        </div>

        <div class="flex items-center space-x-1">
          <!-- View -->
          <RouterLink :to="`/todo/${props.todo.id}`">
            <button
              class="h-8 w-8 p-0 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer flex items-center justify-center"
            >
              <Eye class="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>
          </RouterLink>

          <!-- Edit -->
          <EditTaskBtn :initialData="props.todo">
            <template #default>
              <button
                class="h-8 w-8 p-0 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center justify-center"
              >
                <Edit class="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </button>
            </template>
          </EditTaskBtn>

          <!-- Delete -->
          <DeleteTask :taskId="props.todo.id">
            <template #default>
              <button
                class="h-8 w-8 p-0 rounded hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer flex items-center justify-center"
              >
                <Trash2 class="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </template>
          </DeleteTask>
        </div>
      </div>
    </div>
  </div>
</template>
