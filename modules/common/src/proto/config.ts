export interface Config {
  tabPinMap?: { [tabId: number]: ParamKV[] | undefined };
  tabLockMap?: { [path: string]: ParamKV[] | undefined };
}

export const enum LockType {
  None,
  Locked,
  Pinned,
}

export interface ParamKV {
  key: string;
  value: string;
  lockType: LockType;
}

export const changeEvent = 'emit-config-change';

export const event = 'get-config';
