<script setup>
import { computed } from "vue";
import { ChevronRight, ChevronLeft } from "lucide-vue-next";
import { createPaginationRange } from "../../../lib";

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

// Emits
const emit = defineEmits(["page-change"]);

// Computed values
const currentPage = computed(() => props.data?.meta?.page || 1);
const totalPages = computed(() => props.data?.meta?.totalPages || 1);
const hasNextPage = computed(() => props.data?.meta?.hasNextPage || false);
const hasPreviousPage = computed(
  () => props.data?.meta?.hasPreviousPage || false
);

// Pagination range
const paginationRange = computed(() =>
  createPaginationRange(currentPage.value, totalPages.value)
);

// Emit page change
function onPageChange(pageNum) {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  emit("page-change", pageNum);
}
</script>

<template>
  <div class="flex items-center justify-center gap-4 mt-8">
    <!-- Previous Button -->
    <button
      @click="onPageChange(currentPage - 1)"
      :disabled="!hasPreviousPage"
      class="cursor-pointer hover:bg-pag-hover transition-colors disabled:opacity-50 bg-input-bg border border-foreground text-foreground px-4 py-2 rounded-md flex items-center"
    >
      <span class="hidden xs:block">Previous</span>
      <ChevronLeft class="block xs:hidden w-4 h-4" />
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-2 flex-wrap">
      <template v-for="(pageNum, idx) in paginationRange" :key="idx">
        <span v-if="pageNum === '...'" class="px-2 text-gray-500"> ... </span>
        <button
          v-else
          @click="onPageChange(pageNum)"
          class="px-3 py-1 rounded"
          :class="{
            'bg-blue-600 text-white cursor-not-allowed':
              pageNum === currentPage,
            'bg-input-bg hover:bg-pag-hover cursor-pointer':
              pageNum !== currentPage,
          }"
        >
          {{ pageNum }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="onPageChange(currentPage + 1)"
      :disabled="!hasNextPage"
      class="cursor-pointer hover:bg-pag-hover transition-colors disabled:opacity-50 bg-input-bg border border-foreground text-foreground px-4 py-2 rounded-md flex items-center"
    >
      <span class="hidden xs:block">Next</span>
      <ChevronRight class="block xs:hidden w-4 h-4" />
    </button>
  </div>
</template>
