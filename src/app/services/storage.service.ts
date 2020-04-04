import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  set(key, value): void {
    if (typeof value !== 'string' && typeof value !== 'number') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  get(key): any {
    const val = localStorage.getItem(key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}
