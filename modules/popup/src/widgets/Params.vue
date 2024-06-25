<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-2 gap-x-8 gap-y-8 mb-4">
      <template v-for="(kv, i) in kvList" :key="i">
        <div class="flex items-center gap-4">
          <LockOnIcon
            class="shrink-0"
            size="20"
            :style="{ color: kv.lockType === configProto.LockType.Locked ? 'red' : undefined }"
            @click="onClickLock(kv)"
          />
          <PinIcon
            class="shrink-0"
            size="20"
            :style="{ color: kv.lockType === configProto.LockType.Pinned ? 'blue' : undefined }"
            @click="onClickPin(kv)"
          />
          <Input v-model="kv.key" class="min-w-0" />
        </div>
        <div class="flex items-center">
          <Input v-model="kv.value" class="min-w-0" />
          <MinusCircleIcon class="ml-4 shrink-0" size="20" @click="onDeleteKv(kv)" />
        </div>
      </template>
    </div>
    <AddCircleIcon class="c-active-brand-02 self-end mb-8" size="20" @click="onClickAdd" />
    <Button class="self-end" @click="onClickSubmit">Submit</Button>
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue';
import { Input, Button } from 'tdesign-vue-next';
import { AddCircleIcon, MinusCircleIcon, PinIcon, LockOnIcon } from 'tdesign-icons-vue-next';
import { configProto } from 'common';

const props = defineProps<{ kvItemList: configProto.ParamKV[] }>();
const emit = defineEmits<{
  submit: [value: Record<string, string>];
  kvLockTypeChange: [kv: configProto.ParamKV];
}>();

const kvList = ref<configProto.ParamKV[]>([]);

watch(
  () => props.kvItemList,
  () => {
    kvList.value = props.kvItemList;
  },
  { immediate: true },
);

function onClickSubmit() {
  const params = kvList.value.reduce<Record<string, string>>((acc, { key, value }) => {
    acc[key] = value;

    return acc;
  }, {});

  emit('submit', params);
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
