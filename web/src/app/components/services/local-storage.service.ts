import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class LocalStorage {

  getItem(key: string): string {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: string): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  clear(): void {
    return localStorage.clear();
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }
}
