<template>
  <div class="p-16">
    <Empty v-if="!path" />
    <template v-else>
      <Path :path="path" />
      <Params
        :kv-item-list="kvList"
        class="mt-8"
        @submit="onSubmitParamsChange"
        @kv-lock-type-change="onKVLockTypeChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import {
  stringifyURLSearchParams,
  parseURLSearchParams,
  recordToKVList,
  addKVToList,
  removeKVFromList,
} from '@rosmarinus/common-utils';
import { tabUrlApi, configProto, configApi } from 'common';
import Empty from './widgets/Empty.vue';
import Path from './widgets/Path.vue';
import Params from './widgets/Params.vue';

const tab = ref<chrome.tabs.Tab | undefined>();
const path = ref('');
const params = ref<Record<string, string>>({});
const config = ref<configProto.Config | undefined>();
const dispose = ref<(() => void) | undefined>();

const kvList = computed(() => {
  const url = tab.value?.url;

  if (!url) {
    return [];
  }

  const list = recordToKVList(params.value, (kvItem) => {
    const lockType = (() => {
      const tabLockList = config.value?.tabLockMap?.[path.value] || [];
      const tabPinList = config.value?.tabPinMap?.[tab.value?.id || -1] || [];

      if (tabLockList.some((kv) => kv.key === kvItem.key)) {
        return configProto.LockType.Locked;
      }

      if (tabPinList.some((kv) => kv.key === kvItem.key)) {
        return configProto.LockType.Pinned;
      }

      return configProto.LockType.None;
    })();

    return { ...kvItem, lockType };
  });

  return list;
});

function onSubmitParamsChange(params: Record<string, string>) {
  const url = stringifyURLSearchParams(path.value, params);
  const tabId = tab.value?.id;

  if (tabId) {
    chrome.tabs.update(tabId, { url });
  }

  window.close();
}

function onKVLockTypeChange(kv: configProto.ParamKV) {
  const pinKvList = (() => {
    const list = config.value?.tabPinMap?.[tab.value?.id || -1] ?? [];

    if (kv.lockType === configProto.LockType.Pinned) {
      return addKVToList(list, kv);
    }

    return removeKVFromList(list, kv);
  })();

  const lockKvList = (() => {
    const list = config.value?.tabLockMap?.[path.value] ?? [];

    if (kv.lockType === configProto.LockType.Locked) {
      return addKVToList(list, kv);
    }

    return removeKVFromList(list, kv);
  })();

  const tabId = tab.value?.id ?? -1;

  params.value[kv.key] = kv.value;
  config.value = {
    ...config.value,
    tabPinMap: {
      ...config.value?.tabPinMap,
      [tabId]: pinKvList,
    },
    tabLockMap: {
      ...config.value?.tabLockMap,
      [path.value]: lockKvList,
    },
  };

  configApi.emitConfigChange({
    tabPinMap: {
      [tabId]: pinKvList,
    },
    tabLockMap: {
      [path.value]: lockKvList,
    },
  });
}

watch(
  () => tab.value,
  () => {
    const [urlPath, urlParams] = parseURLSearchParams(tab.value?.url || '');

    path.value = urlPath;
    params.value = urlParams;
  },
  { immediate: true },
);

onMounted(async () => {
  tab.value = (await tabUrlApi.getActivatedTabInfo({}))?.tab;
  config.value = await configApi.getConfig();

  if (process.env.IS_DEV) {
    tab.value = {
      url: 'https://www.google.com?p1=d',
      index: 0,
      groupId: 0,
      windowId: 0,
      selected: false,
      active: false,
      pinned: false,
      highlighted: false,
      discarded: false,
      autoDiscardable: false,
      mutedInfo: { muted: false },
      sessionId: '0',
      status: 'complete',
      incognito: false,
      width: 0,
      height: 0,
      lastAccessed: 0,
      audible: false,
    };
  }

  dispose.value = tabUrlApi.onActivatedTabInfoChange(async (info) => {
    tab.value = info.tab;
  });
});

onUnmounted(() => {
  dispose.value?.();
});
</script>
