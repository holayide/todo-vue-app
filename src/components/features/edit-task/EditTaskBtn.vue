<script setup>
import { ref } from "vue";
import TaskForm from "../../ui/TaskForm.vue";

const props = defineProps({
  initialData: {
    type: Object,
    required: true,
  },
  update: {
    type: String,
    default: "create",
  },
});

const open = ref(false);

function handleClose() {
  open.value = false;
}
</script>

<template>
  <div>
    <!-- Trigger button (slot) -->
    <span @click="open = true">
      <slot />
    </span>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div
          class="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-xl p-6 relative"
        >
          <!-- Header -->
          <div class="mb-4 border-b pb-2">
            <h2
              class="text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              Edit Task
            </h2>
          </div>

          <!-- Close Button -->
          <button
            class="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            @click="handleClose"
          >
            ✕
          </button>

          <!-- Task Form -->
          <TaskForm
            :initialData="props.initialData"
            :update="props.update"
            @close-form="handleClose"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
