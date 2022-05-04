import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StorageService {
  public isLogged$ = new BehaviorSubject(this.isLogged());

  public setItem(key: string, item?: string): void {
    if (!item) return;
    localStorage.setItem(key, item);
    this.isLogged$.next(this.isLogged());
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isLogged$.next(this.isLogged());
  }

  public getToken() {
    return localStorage.getItem('token') as string;
  }
}
