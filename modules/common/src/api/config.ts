import { configProto } from '../proto';
import { messageManger } from '../base';

export async function emitConfigChange(req: configProto.Config) {
  return messageManger.sendMessage<void, configProto.Config>(configProto.changeEvent, req);
}

export function onConfigChange(callback: (req: configProto.Config) => Promise<void>) {
  return messageManger.onMessage<void, configProto.Config>(configProto.changeEvent, callback);
}

export async function getConfig() {
  return messageManger.sendMessage<configProto.Config, Record<string, never>>(configProto.event, {});
}

export function onGetConfig(callback: () => Promise<configProto.Config>) {
  return messageManger.onMessage<configProto.Config, Record<string, never>>(configProto.event, callback);
}
