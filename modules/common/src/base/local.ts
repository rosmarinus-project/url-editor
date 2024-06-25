export function getLang() {
  const en = chrome.i18n?.getUILanguage();

  if (en.startsWith('zh')) {
    return 'zh-CN';
  }

  return 'en';
}
