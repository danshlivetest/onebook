import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  get<Data>(key: string): Data | null {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as Data;
  }

  put<Data>(key: string, data: Data): void {
    localStorage.setItem(key, JSON.stringify(data || ''));
  }
}
