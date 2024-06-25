declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        IS_DEV: boolean;
        IS_PROD: boolean;
      }
    }
  }
}
