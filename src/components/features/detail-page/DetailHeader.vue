<script setup>
import { useRouter } from "vue-router";
import { useToggleDetailTodo } from "../../../services/queries";

// UI components
import Button from "../../ui/Button.vue";
import DeleteTask from "../delete-task/DeleteTask.vue";
import EditTaskBtn from "../edit-task/EditTaskBtn.vue";

// icons
import { ArrowLeft, CheckCircle2, Circle, Edit, Trash2 } from "lucide-vue-next";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const { mutate: toggleStatus, isPending } = useToggleDetailTodo();
</script>

<template>
  <div class="xs:flex items-center justify-between mb-8 space-y-4 xs:space-y-0">
    <!-- Left Section -->
    <div class="flex flex-wrap items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        class="hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
        @click="router.push('/')"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back to Tasks
      </Button>

      <hr class="h-6 w-px bg-slate-300 dark:bg-slate-600" />

      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
        Task Details
      </h1>
    </div>

    <!-- Right Section -->
    <div class="flex flex-wrap items-center space-x-2 space-y-3 xs:space-y-0">
      <!-- Toggle Status -->
      <Button
        variant="outline"
        @click="toggleStatus({ id: props.data.id, status: props.data.status })"
        class="border-slate-200 cursor-pointer"
        :class="{
          'bg-green-50 text-green-700 hover:bg-green-100':
            props.data.status === 'DONE',
          'hover:bg-slate-50': props.data.status !== 'DONE',
        }"
      >
        <template v-if="isPending">
          <div
            class="w-4 h-4 animate-spin rounded-full border-2 border-t-transparent border-slate-400"
          />
        </template>

        <template v-else-if="props.data.status === 'DONE'">
          <CheckCircle2 class="w-4 h-4 mr-2 text-green-600" />
          Completed
        </template>

        <template v-else>
          <Circle class="w-4 h-4 mr-2" />
          Mark Complete
        </template>
      </Button>

      <!-- Edit -->
      <EditTaskBtn :initialData="props.data" update="detail">
        <Button variant="outline" class="border-slate-200 cursor-pointer">
          <Edit class="w-4 h-4 mr-2" />
          Edit
        </Button>
      </EditTaskBtn>

      <!-- Delete -->
      <DeleteTask :taskId="props.data.id" edit="detail">
        <Button
          variant="outline"
          class="border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
        >
          <Trash2 class="w-4 h-4 mr-2" />
          Delete
        </Button>
      </DeleteTask>
    </div>
  </div>
</template>
