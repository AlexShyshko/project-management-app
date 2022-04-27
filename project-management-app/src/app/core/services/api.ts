import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

const BASE = 'http://localhost:4000';
const SIGNUP = `${BASE}/signup`;
const SIGNIN = `${BASE}/signin`;
const USERS = `${BASE}/users`;

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  //signup: (user: {name, login, password}) => {id, name, login}, signin: (user: {login, password}) => {token}
  public authenticate(user: User, mode: string): Observable<User> {
    const url = mode === 'signup' ? SIGNUP : SIGNIN;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this.httpClient.post<User>(url, body, { headers: headers });
  }

  public getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('accept', 'application/json').set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<User[]>(USERS, { headers: headers });
  }
}
