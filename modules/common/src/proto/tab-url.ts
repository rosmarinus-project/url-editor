export interface getActivatedTabInfoReq {
  tab?: chrome.tabs.Tab;
}

export interface getActivatedTabInfoRes {
  tab?: chrome.tabs.Tab;
}

export interface ActivatedChangeTabInfo {
  tab?: chrome.tabs.Tab;
}

export const event = 'get-activated-tab-info';

export const changeEvent = 'emit-activated-tab-info';
