<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDeleteTodo } from "../../../services/queries";

const props = defineProps({
  taskId: {
    type: [String, Number],
    required: true,
  },
  edit: {
    type: String,
    default: "home",
  },
});

const open = ref(false);
const router = useRouter();

const { mutate: deleteTask, isPending } = useDeleteTodo();

function handleDelete() {
  deleteTask(props.taskId, {
    onSuccess: () => {
      if (props.edit === "detail") router.push("/home");
      open.value = false;
    },
  });
}
</script>

<template>
  <div>
    <!-- Trigger button (slot for custom children) -->
    <span @click="open = true">
      <slot />
    </span>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <div
          class="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-full max-w-md p-6 relative"
        >
          <!-- Header -->
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Are you absolutely sure?
          </h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            This action cannot be undone. This will permanently delete this task
            and remove it from your task list.
          </p>

          <!-- Footer -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              class="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              @click="open = false"
            >
              Cancel
            </button>
            <button
              :disabled="isPending"
              @click="handleDelete"
              class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer disabled:opacity-50"
            >
              <span v-if="isPending" class="animate-pulse">Deleting...</span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
