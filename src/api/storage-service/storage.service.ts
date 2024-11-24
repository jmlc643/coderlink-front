import { Injectable } from '@angular/core';
import { AuthResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authKey = 'readedu_auth';

  constructor() {}

  setAuthData(data: AuthResponse): void {
    localStorage.setItem(this.authKey, JSON.stringify(data));
  }

  getAuthData(): AuthResponse | null {
    const data = localStorage.getItem(this.authKey);
    return data ? (JSON.parse(data) as AuthResponse) : null;
  }

  clearAuthData(): void {
    // Eliminamos los datos del `localStorage` usando la clave `authKey`
    localStorage.removeItem(this.authKey);
  }
}
