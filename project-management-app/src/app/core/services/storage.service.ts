import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';

const TOKEN_TIME_CHECK = 1000 * 60;

@Injectable()
export class StorageService {
  public isLogged$ = new BehaviorSubject(this.isLogged());

  constructor(private router: Router) {}

  public setItem(key: string, item?: string): void {
    if (!item) return;
    localStorage.setItem(key, item);
    this.isLogged$.next(this.isLogged());
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    const decode = JSON.parse(atob(token.split('.')[1]));
    const now = new Date().getTime();
    if (now - decode.iat * 1000 < TOKEN_TIME_CHECK) return;
    this.logout();
    this.router.navigate(['/']);
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
    this.checkToken();
    return localStorage.getItem('token');
  }

  public getUserId() {
    const token = this.getToken();
    const decode = JSON.parse(atob(token.split('.')[1]));
    return decode.userId;
  }

  public getUserName() {
    const item = localStorage.getItem('user');
    if (!item) return;
    const user = JSON.parse(item) as User;
    return user.name;
  }
}
