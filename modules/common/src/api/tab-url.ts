/* eslint-disable @typescript-eslint/indent */
import { messageManger } from '../base';
import { tabUrlProto } from '../proto';

export async function getActivatedTabInfo(
  req: tabUrlProto.getActivatedTabInfoReq,
): Promise<tabUrlProto.getActivatedTabInfoRes | undefined> {
  return messageManger.sendMessage<tabUrlProto.getActivatedTabInfoRes, tabUrlProto.getActivatedTabInfoReq>(
    tabUrlProto.event,
    req,
  );
}

export function onGetActivatedTabInfo(
  callback: (res: tabUrlProto.getActivatedTabInfoReq) => Promise<tabUrlProto.getActivatedTabInfoRes>,
) {
  return messageManger.onMessage<tabUrlProto.getActivatedTabInfoRes, tabUrlProto.getActivatedTabInfoReq>(
    tabUrlProto.event,
    (req) => {
      return callback(req);
    },
  );
}

export async function emitActivatedTabInfoChange(req: tabUrlProto.ActivatedChangeTabInfo) {
  return messageManger.sendMessage<void, tabUrlProto.ActivatedChangeTabInfo>(tabUrlProto.changeEvent, req);
}

export function onActivatedTabInfoChange(callback: (res: tabUrlProto.ActivatedChangeTabInfo) => Promise<void>) {
  return messageManger.onMessage<void, tabUrlProto.ActivatedChangeTabInfo>(tabUrlProto.changeEvent, (req) => {
    return callback(req);
  });
}
