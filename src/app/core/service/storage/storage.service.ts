import { Injectable } from '@angular/core';

const storage = localStorage;

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public default<T>(key: string, value: T): void {
    const existingValue = storage.getItem(key);
    if (!existingValue) {
      this.save(key, value);
    }
  }

  public save<T>(key: string, value: T): void {
    storage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string, defaultValue?: T): T | undefined {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }

}
