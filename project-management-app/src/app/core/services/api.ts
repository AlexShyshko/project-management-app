import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../../models/user.model";
import { jsDocComment } from "@angular/compiler";

const BASE = 'http://localhost:4000';
const SIGNUP = `${BASE}/signup`;
const SIGNIN = `${BASE}/signin`;
const USERS = `${BASE}/users`

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, message was: `, error.error.message);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  //signup: (user: {name, login, password}) => {id, name, login}, signin: (user: {login, password}) => {token}
  public authenticate(user: User, mode: string): Observable<User> {
    const url = mode === 'signup' ? SIGNUP : SIGNIN;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this.httpClient.post<User>(url, body, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  public getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User[]>(USERS, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(token: string, id: string) {
    const headers = new HttpHeaders().set('accept', '*/*').set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete(`${USERS}/${id}`, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  public updateUser(user: User, token: string, id: string): Observable<User> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.put(`${USERS}/${id}`, body, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }
}
