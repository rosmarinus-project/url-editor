<template>
  <div>
    <div class="text-font-l font-medium">Path</div>
    <div class="text-font-m mt-4 text-switch-close-click">{{ path }}</div>
  </div>
</template>

<script setup lang="ts">
const { path } = defineProps<{ path: string }>();
</script>
