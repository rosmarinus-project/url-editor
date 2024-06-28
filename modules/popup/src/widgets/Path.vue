<template>
  <div>
    <div class="text-font-l font-medium text-fg-0">{{ i18n('app_name') }}</div>
    <div class="text-font-m mt-4 text-fg-1 break-all">{{ path }}</div>
  </div>
</template>

<script setup lang="ts">
import { i18n } from '../utils/i18n';

const { path } = defineProps<{ path: string }>();
</script>
