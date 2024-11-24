import { Injectable } from '@angular/core';
import { AuthResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authKey = 'coderlink_auth';
  private selectKey = 'lastSelectedStatus';


  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  setAuthData(data: AuthResponse): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.authKey, JSON.stringify(data));
    } else {
      console.warn('LocalStorage no está disponible. Datos no guardados.');
    }
  }

  getAuthData(): AuthResponse | null {
    if (this.isLocalStorageAvailable()) {
      const data = localStorage.getItem(this.authKey);
      return data ? (JSON.parse(data) as AuthResponse) : null;
    } else {
      console.warn('LocalStorage no está disponible. No se pudo recuperar los datos.');
      return null;
    }
  }

  clearAuthData(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.authKey);
    } else {
      console.warn('LocalStorage no está disponible. No se pudo eliminar los datos.');
    }
  }

  // Métodos para el <select>
  setLastSelectedStatus(status: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.selectKey, status);
    } else {
      console.warn('LocalStorage no está disponible. No se pudo guardar el estado seleccionado.');
    }
  }

  getLastSelectedStatus(): string {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.selectKey) || 'TODO'; // Valor por defecto
    } else {
      console.warn('LocalStorage no está disponible. Retornando valor por defecto.');
      return 'TODO';
    }
  }
}
