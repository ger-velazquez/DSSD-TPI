import { LocalStorageKeys } from "../interfaces/LocalStorageInterfaces";

export interface CacheContent<TContent> {
  content: TContent;
  timestamp: number;
}

class LocalStorageService {
  getItem<T>(key: LocalStorageKeys): T {
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeItem(key: LocalStorageKeys) {
    localStorage.removeItem(key)
  }

  setItem<CacheContent>(key: LocalStorageKeys, value: CacheContent) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default new LocalStorageService();
