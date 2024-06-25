import { safeJSONParse, safeJSONStringify } from '@rosmarinus/common-utils';

export async function setSync(name: string, value: Record<string, any>): Promise<void> {
  if (chrome.storage?.sync?.set) {
    await chrome.storage.sync.set({ [name]: value });
  } else {
    console.warn('setSync in localStorage', { name, value });
    localStorage.setItem(name, safeJSONStringify(value));
  }
}

export async function getSync<T>(name: string): Promise<T | undefined> {
  if (chrome.storage?.sync?.get) {
    const res = await chrome.storage.sync.get(name);

    console.log('getSync', { name, res });

    return res[name];
  }

  return safeJSONParse(localStorage.getItem(name));
}

export async function getLocal<T>(name: string): Promise<T | undefined> {
  if (chrome.storage?.local?.get) {
    const res = await chrome.storage.local.get(name);

    return res[name];
  }

  return safeJSONParse(localStorage.getItem(name));
}

export async function setLocal(name: string, value: Record<string, any>): Promise<void> {
  if (chrome.storage?.local?.set) {
    await chrome.storage.local.set({ [name]: value });
  } else {
    console.warn('setLocal in localStorage', { name, value });
    localStorage.setItem(name, safeJSONStringify(value));
  }
}

export async function getSession<T>(name: string): Promise<T | undefined> {
  if (chrome.storage?.session?.get) {
    const res = await chrome.storage.session.get(name);

    return res[name];
  }

  return safeJSONParse(sessionStorage.getItem(name));
}

export async function setSession(name: string, value: Record<string, any>): Promise<void> {
  if (chrome.storage?.session?.set) {
    await chrome.storage.session.set({ [name]: value });
  } else {
    console.warn('setSession in sessionStorage', { name, value });
    sessionStorage.setItem(name, safeJSONStringify(value));
  }
}
