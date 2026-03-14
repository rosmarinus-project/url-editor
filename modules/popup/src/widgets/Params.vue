<template>
  <div class="flex flex-col">
    <JsonEditor
      v-if="editingJsonIndex !== null"
      :model-value="kvList[editingJsonIndex].value"
      :param-key="kvList[editingJsonIndex].key"
      @update:modelValue="onJsonSave"
      @close="editingJsonIndex = null"
    />
    <template v-else>
      <div class="grid grid-cols-2 gap-x-8 gap-y-8">
        <template v-for="(kv, i) in kvList" :key="i">
          <div class="flex items-center gap-4">
            <div class="shrink-0 c-active-cover" @click="onClickLock(kv)">
              <UserLockedIcon v-if="kv.lockType === configProto.LockType.Locked" size="20" class="text-fg-0" />
              <UserUnlockedIcon v-else size="20" class="text-fg-1" />
            </div>
            <div class="shrink-0 c-active-cover" @click="onClickPin(kv)">
              <LockOnIcon v-if="kv.lockType === configProto.LockType.Pinned" size="20" class="text-fg-0" />
              <LockOffIcon v-else size="20" class="text-fg-1" />
            </div>
            <Input v-model="kv.key" class="min-w-0 text-fg-0" :placeholder="`${i18n('input_key')}...`" />
          </div>
          <div class="flex items-center">
            <Input
              v-model="kv.value"
              class="min-w-0"
              :placeholder="`${i18n('input_value')}...`"
              @enter="onClickSubmit"
            />
            <div v-if="isJsonString(kv.value)" class="ml-4 shrink-0 c-active-cover" @click="editingJsonIndex = i">
              <CodeIcon size="20" class="text-fg-0" />
            </div>
            <div class="shrink-0 c-active-cover ml-4" @click="onDeleteKv(kv)">
              <MinusCircleIcon size="20" class="text-fg-0" />
            </div>
          </div>
        </template>
      </div>
      <div class="self-end flex gap-8 mt-16">
        <Button @click="onClickAdd">{{ i18n('add_param') }}</Button>
        <Button theme="success" @click="onClickSubmit">{{ i18n('reload_page') }}</Button>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue';
import { Input, Button } from 'tdesign-vue-next';
import {
  MinusCircleIcon,
  LockOnIcon,
  LockOffIcon,
  UserLockedIcon,
  UserUnlockedIcon,
  CodeIcon,
} from 'tdesign-icons-vue-next';
import { configProto } from 'common';
import { mergeKVListInto } from '@rosmarinus/common-utils';
import { i18n } from '../utils/i18n';
import JsonEditor from './JsonEditor.vue';

const props = defineProps<{ kvItemList: configProto.ParamKV[] }>();
const emit = defineEmits<{
  submit: [value: configProto.ParamKV[]];
  kvLockTypeChange: [kv: configProto.ParamKV];
}>();

const kvList = ref<configProto.ParamKV[]>([]);
const editingJsonIndex = ref<number | null>(null);

watch(
  () => props.kvItemList,
  () => {
    kvList.value = mergeKVListInto(props.kvItemList, kvList.value, (oldItem, newItem) => ({
      ...newItem,
      value: oldItem.value,
    }));
  },
  { immediate: true },
);

function isJsonString(value: string): boolean {
  try {
    const parsed = JSON.parse(value);

    return typeof parsed === 'object' && parsed !== null;
  } catch {
    return false;
  }
}

function onJsonSave(value: string) {
  if (editingJsonIndex.value !== null) {
    kvList.value[editingJsonIndex.value].value = value;
  }
}

function onClickSubmit() {
  emit('submit', kvList.value);
}

function onClickAdd() {
  kvList.value.push({ key: '', value: '', lockType: configProto.LockType.None });
}

function onDeleteKv(kv: configProto.ParamKV) {
  const index = kvList.value.indexOf(kv);

  kvList.value.splice(index, 1);
}

function onClickLock(kv: configProto.ParamKV) {
  kv.lockType = kv.lockType === configProto.LockType.Locked ? configProto.LockType.None : configProto.LockType.Locked;
  emit('kvLockTypeChange', kv);
}

function onClickPin(kv: configProto.ParamKV) {
  kv.lockType = kv.lockType === configProto.LockType.Pinned ? configProto.LockType.None : configProto.LockType.Pinned;
  emit('kvLockTypeChange', kv);
}
</script>
