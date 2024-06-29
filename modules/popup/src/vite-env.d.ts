/// <reference types="vite/client" />

/* eslint-disable */
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        IS_DEV: boolean;
        IS_PROD: boolean;
        GITHUB_URL?: string;
      }
    }
  }
}
