/* eslint-disable @typescript-eslint/indent */

declare namespace chrome {
  export namespace runtime {
    export const onMessage: events.Event<
      (message: any, sender: MessageSender, sendResponse: (message?: any, port?: Port) => void) => boolean | undefined
    >;
  }
}
