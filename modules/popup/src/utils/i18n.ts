import devConfig from '../../../../i18n/zh_CN/messages.json';

export function i18n(name: string) {
  if (process.env.IS_DEV) {
    return (devConfig as any)[name]?.message || '';
  }

  const res = chrome.i18n.getMessage(name);

  return res;
}
