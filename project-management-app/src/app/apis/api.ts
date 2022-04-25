import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const BASE = 'http://localhost:4000';
const SIGNUP = `${BASE}/signup`;
const SIGNIN = `${BASE}/signin`;

interface Headers {
  [header: string]: string,
}

interface User {
  "name"?: string,
  "login": string,
  "password": string
}

const HEADERS: Headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  public signup(user: User) {
    const body = JSON.stringify(user);
    return this.httpClient.post(SIGNUP, body, {headers: HEADERS});
  }

  public signin(user: User) {
    const body = JSON.stringify(user);
    return this.httpClient.post(SIGNIN, body, {headers: HEADERS});
  }
}
