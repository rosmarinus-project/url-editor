<template>
  <div>
    <div class="text-font-l font-medium text-fg-0">URL Editor</div>
    <div class="text-font-m mt-4 text-fg-1">{{ path }}</div>
  </div>
</template>

<script setup lang="ts">
const { path } = defineProps<{ path: string }>();
</script>
