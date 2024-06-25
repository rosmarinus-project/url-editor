import { getSync, setSync } from './base/storage';
import { configProto } from './proto';

const enum StorageKey {
  KVLockKey = 'm-kv-lock',
}

class Storage {
  public async getSyncConfig(): Promise<configProto.Config | undefined> {
    const res = await getSync<{ config: configProto.Config }>(StorageKey.KVLockKey);

    return res?.config;
  }

  public async setSyncConfig(config: configProto.Config): Promise<void> {
    return setSync(StorageKey.KVLockKey, { config });
  }
}

export const storage = new Storage();
