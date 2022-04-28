import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class StorageService {
  public isLogged$ = new BehaviorSubject(false);

  public setItem(key: string, item?: string): void {
    if(!item) return;
    localStorage.setItem(key, item);
    this.isLogged$.next(this.isLogged());
  }

  private isLogged(): boolean {
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
