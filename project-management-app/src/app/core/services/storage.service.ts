import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';

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
    localStorage.removeItem('user');
    this.isLogged$.next(this.isLogged());
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserId() {
    const item = localStorage.getItem('user');
    if (!item) return;
    const user = JSON.parse(item) as User;
    return user.id;
  }

  public getUserName() {
    const item = localStorage.getItem('user');
    if (!item) return;
    const user = JSON.parse(item) as User;
    return user.name;
  }
}
