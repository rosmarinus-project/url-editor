<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-8">
      <div class="shrink-0 c-active-cover" @click="onClose">
        <ChevronLeftIcon size="20" class="text-fg-0" />
      </div>
      <span class="text-fg-0 text-sm truncate">{{ paramKey }}</span>
    </div>
    <Textarea v-model="text" :autosize="{ minRows: 6, maxRows: 14 }" />
    <div class="flex items-center justify-between">
      <span v-if="jsonError" class="text-sm" style="color: var(--td-error-color)">{{ i18n('json_error') }}</span>
      <span v-else />
      <Button theme="success" :disabled="jsonError" @click="onSave">{{ i18n('json_save') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Textarea, Button } from 'tdesign-vue-next';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { i18n } from '../utils/i18n';

const props = defineProps<{
  modelValue: string;
  paramKey: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  close: [];
}>();

const text = ref('');
const jsonError = ref(false);

watch(
  () => props.modelValue,
  (val) => {
    try {
      text.value = JSON.stringify(JSON.parse(val), null, 2);
      jsonError.value = false;
    } catch {
      text.value = val;
      jsonError.value = true;
    }
  },
  { immediate: true },
);

watch(text, (val) => {
  try {
    JSON.parse(val);
    jsonError.value = false;
  } catch {
    jsonError.value = true;
  }
});

function onSave() {
  if (jsonError.value) return;
  try {
    const compact = JSON.stringify(JSON.parse(text.value));
    emit('update:modelValue', compact);
    emit('close');
  } catch {
    jsonError.value = true;
  }
}

function onClose() {
  emit('close');
}
</script>
