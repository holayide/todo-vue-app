<script setup>
import { ref } from "vue";
import { Plus } from "lucide-vue-next";
import TaskForm from "../../ui/TaskForm.vue";

const open = ref(false);

function handleClose() {
  open.value = false;
}
</script>

<template>
  <div>
    <!-- Trigger button -->
    <button
      @click="open = true"
      class="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg cursor-pointer"
    >
      <Plus class="w-5 h-5 mr-2" />
      Create New Task
    </button>

    <!-- Modal -->
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-xl p-6"
      >
        <!-- Header -->
        <div class="mb-4 border-b pb-2">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Create New Task
          </h2>
        </div>

        <!-- Task Form -->
        <TaskForm :onCloseForm="handleClose" />
      </div>
    </div>
  </div>
</template>
