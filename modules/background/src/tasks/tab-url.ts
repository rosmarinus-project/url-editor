import { hookAsyncData } from '@rosmarinus/common-utils';
import { tabUrlApi, storage, configApi } from 'common';
import type { TabChangeInfo } from '../types';

// eslint-disable-next-line max-lines-per-function
export function initTabUrlListener() {
  const { getData: getTab, setData: setTab } = hookAsyncData(
    async () => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

      return tabs[0];
    },
    {
      afterUpdate(data) {
        tabUrlApi.emitActivatedTabInfoChange({ tab: data });
      },
    },
  );

  const { getData: getConfig, setData: setConfig } = hookAsyncData(
    async () => {
      return storage.getSyncConfig();
    },
    {
      afterUpdate(data) {
        storage.setSyncConfig({
          tabLockMap: data?.tabLockMap,
        });
      },
    },
  );

  const onConfigChangeDispose = configApi.onConfigChange(async (newConfig) => {
    const oldConfig = await getConfig();

    console.log('[url-editor] onConfigChangeDispose', oldConfig, newConfig);

    setConfig({
      tabPinMap: {
        ...oldConfig?.tabPinMap,
        ...newConfig.tabPinMap,
      },
      tabLockMap: {
        ...oldConfig?.tabLockMap,
        ...newConfig.tabLockMap,
      },
    });
  });
  const onGetConfigDispose = configApi.onGetConfig(async () => {
    const config = await getConfig();

    return config || {};
  });

  const onActivatedListener = async (activeInfo: { tabId: number; windowId: number }) => {
    const newTabInfo = await chrome.tabs.get(activeInfo.tabId);

    setTab(newTabInfo);
  };

  const onUpdateListener = async (tabId: number, changeInfo: TabChangeInfo, tab: chrome.tabs.Tab) => {
    const nowActiveTab = await getTab();

    if (tabId !== nowActiveTab?.id) {
      return;
    }

    const config = await getConfig();
    let needForceUpdate = false;
    const params = Object.fromEntries(new URLSearchParams(tab.url?.split('?')[1]));

    {
      const kvList = config?.tabPinMap?.[tabId];

      kvList?.forEach((kv) => {
        if (params[kv.key] !== kv.value) {
          params[kv.key] = kv.value;
          needForceUpdate = true;
        }
      });
    }

    {
      const path = tab.url?.split('?')[0] || '';
      const kvList = config?.tabLockMap?.[path];

      kvList?.forEach((kv) => {
        if (params[kv.key] !== kv.value) {
          params[kv.key] = kv.value;
          needForceUpdate = true;
        }
      });
    }

    if (needForceUpdate) {
      const newUrl = `${tab.url?.split('?')[0]}?${new URLSearchParams(params)}`;

      chrome.tabs.update(tabId, { url: newUrl });
    } else {
      setTab(tab);
    }
  };

  chrome.tabs.onActivated.addListener(onActivatedListener);
  chrome.tabs.onUpdated.addListener(onUpdateListener);
  const onGetActivatedTabInfoDispose = tabUrlApi.onGetActivatedTabInfo(async () => {
    return { tab: await getTab() };
  });

  return () => {
    chrome.tabs?.onActivated.removeListener(onActivatedListener);
    chrome.tabs?.onUpdated.removeListener(onUpdateListener);
    onGetActivatedTabInfoDispose();
    onConfigChangeDispose();
    onGetConfigDispose();
  };
}
