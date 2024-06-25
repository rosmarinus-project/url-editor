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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { tabUrlApi, configProto, configApi } from 'common';
import Empty from './widgets/Empty.vue';
import Path from './widgets/Path.vue';
import Params from './widgets/Params.vue';

const tab = ref<chrome.tabs.Tab | undefined>();
const config = ref<configProto.Config | undefined>();
const dispose = ref<(() => void) | undefined>();

const path = computed(() => {
  const url = tab.value?.url;

  if (!url) {
    return '';
  }

  try {
    return url.split('?')[0];
  } catch (e) {
    return '';
  }
});

const kvList = computed(() => {
  const url = tab.value?.url;

  if (!url) {
    return [];
  }

  try {
    const search = url.split('?')[1];

    if (!search) {
      return [];
    }

    return Object.entries(Object.fromEntries(new URLSearchParams(search))).reduce((acc, [key, value]) => {
      const lockType = (() => {
        const tabLockList = config.value?.tabLockMap?.[path.value] || [];
        const tabPinList = config.value?.tabPinMap?.[tab.value?.id || -1] || [];

        if (tabLockList.some((kv) => kv.key === key)) {
          return configProto.LockType.Locked;
        }

        if (tabPinList.some((kv) => kv.key === key)) {
          return configProto.LockType.Pinned;
        }

        return configProto.LockType.None;
      })();

      acc.push({ key, value, lockType });

      return acc;
    }, [] as configProto.ParamKV[]);
  } catch (e) {
    return [];
  }
});

function onSubmitParamsChange(params: Record<string, string>) {
  const search = new URLSearchParams(params).toString();
  const url = Object.keys(search) ? `${path.value}?${search}` : path.value;
  const tabId = tab.value?.id;

  if (tabId) {
    chrome.tabs.update(tabId, { url });
  }
}

function onKVLockTypeChange(kv: configProto.ParamKV) {
  configApi.emitConfigChange({
    tabPinMap: {
      [tab.value?.id || -1]: (() => {
        const list = config.value?.tabPinMap?.[tab.value?.id || -1] ?? [];

        if (kv.lockType === configProto.LockType.Pinned && !list?.includes(kv)) {
          list.push(kv);
        }

        return list.filter((kvItem) => {
          if (kv.lockType !== configProto.LockType.Pinned && kvItem === kv) {
            return false;
          }

          return true;
        });
      })(),
    },
    tabLockMap: {
      [path.value]: (() => {
        const list = config.value?.tabLockMap?.[path.value] ?? [];

        if (kv.lockType === configProto.LockType.Locked && !list?.includes(kv)) {
          list.push(kv);
        }

        return list.filter((kvItem) => {
          if (kv.lockType !== configProto.LockType.Locked && kvItem === kv) {
            return false;
          }

          return true;
        });
      })(),
    },
  });
}

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
