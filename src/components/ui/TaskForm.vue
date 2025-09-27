<script setup>
import { Flag, FileText } from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useCreateTodo, useUpdateTodo } from "../../services/queries";
import { taskSchema } from "../features/new-task/schema";

const props = defineProps({
  onCloseForm: {
    type: Function,
    default: null,
  },
  initialData: Object,
  update: {
    type: String,
    default: "create",
  },
});

const router = useRouter();

const form = ref({
  name: "",
  description: "",
  priority: "LOW",
  status: "TODO",
});

const errors = ref({});
const isEditMode = ref(false);

const { mutate: createTask, isPending: isCreating } = useCreateTodo();
const { mutate: updateTask, isPending: isUpdating } = useUpdateTodo();

const isPending = computed(() => isCreating.value || isUpdating.value);

// Reset form with initialData if editing
onMounted(() => {
  if (props.initialData) {
    isEditMode.value = true;
    form.value = {
      name: props.initialData.name || "",
      description: props.initialData.description || "",
      priority: props.initialData.priority?.toUpperCase() || "LOW",
      status: props.initialData.status || "TODO",
    };
  }
});

// Validate with zod
function validate() {
  errors.value = {};
  const result = taskSchema.safeParse(form.value);
  if (!result.success) {
    result.error.errors.forEach((e) => {
      errors.value[e.path[0]] = e.message;
    });
    return false;
  }
  return true;
}

function onSubmit() {
  if (!validate()) return;

  if (!form.value.name.trim()) {
    errors.value.name = "Title is required";
    return;
  }

  const mutation = isEditMode.value ? updateTask : createTask;

  mutation(
    isEditMode.value
      ? {
          id: props.initialData.id,
          status: props.initialData.status,
          ...form.value,
        }
      : form.value,
    {
      onSuccess: () => {
        form.value = {
          name: "",
          description: "",
          priority: "LOW",
          status: "TODO",
        };
        if (props.update === "detail") router.push("/home");
        props.onCloseForm?.();
      },
    }
  );
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Title -->
    <div class="space-y-2">
      <label
        for="title"
        class="text-sm font-medium flex items-center text-slate-700 dark:text-slate-300"
      >
        <FileText class="w-4 h-4 mr-2" /> Title
      </label>
      <input
        v-model="form.name"
        id="title"
        type="text"
        maxlength="50"
        placeholder="Enter task title..."
        class="w-full rounded-md border px-3 py-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500"
        :class="
          errors.name
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : ''
        "
      />
      <p v-if="errors.name" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.name }}
      </p>
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <label
        for="description"
        class="text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        Description
      </label>
      <textarea
        v-model="form.description"
        id="description"
        maxlength="200"
        rows="4"
        placeholder="Describe your task in detail..."
        class="max-w-[526px] w-full rounded-md border px-3 py-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 resize-none"
      />
      <p
        v-if="errors.description"
        class="text-sm text-red-600 dark:text-red-400"
      >
        {{ errors.description }}
      </p>
    </div>

    <!-- Priority -->
    <div class="space-y-2">
      <label
        for="priority"
        class="text-sm font-medium flex items-center text-slate-700 dark:text-slate-300"
      >
        <Flag class="w-4 h-4 mr-2" /> Priority
      </label>
      <select
        v-model="form.priority"
        id="priority"
        class="w-full rounded-md border px-3 py-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="LOW">Low Priority</option>
        <option value="MEDIUM">Medium Priority</option>
        <option value="HIGH">High Priority</option>
      </select>
      <p v-if="errors.priority" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.priority }}
      </p>
    </div>

    <!-- Submit -->
    <div class="flex justify-end pt-4">
      <button
        type="submit"
        :disabled="isPending"
        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md cursor-pointer flex items-center justify-center space-x-2"
      >
        <span
          v-if="isPending"
          class="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full"
        ></span>
        <span>{{ isEditMode ? "Update Task" : "Create Task" }}</span>
      </button>
    </div>
  </form>
</template>
