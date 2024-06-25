export class MessageManger {
  public async sendMessage<Res, Req>(eventname: string, message: Req): Promise<Res | undefined> {
    if (!chrome.runtime?.sendMessage) {
      return undefined;
    }

    try {
      const res = await chrome.runtime.sendMessage(
        {
          event: eventname,
          data: message,
        },
        { includeTlsChannelId: true },
      );

      return res;
    } catch (e) {
      return undefined;
    }
  }

  public onMessage<Res, Req>(eventname: string, callback: (message: Req) => Promise<Res>): () => void {
    if (!chrome.runtime?.onMessage?.addListener) {
      return () => {};
    }

    const handler = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (message?: any, port?: chrome.runtime.Port) => void,
    ) => {
      const { event, data } = message || {};

      if (event !== eventname) {
        return;
      }

      callback(data)
        .then((res) => {
          sendResponse(res);
        })
        .catch((e) => {
          console.error(e);
          sendResponse(undefined);
        });

      return true;
    };

    chrome.runtime.onMessage.addListener(handler);

    return () => {
      chrome.runtime.onMessage.removeListener(handler);
    };
  }
}

export const messageManger = new MessageManger();
