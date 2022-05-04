import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';

const BASE = 'http://localhost:4000';
const SIGNUP = `${BASE}/signup`;
const SIGNIN = `${BASE}/signin`;
const USERS = `${BASE}/users`;
const BOARDS = `${BASE}/boards`;

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, message was: `, error.error.message);
      return throwError(() => new Error(error.error.message));
    }
    return throwError(() => new Error(error.message));
  }

  //signup: (user: {name, login, password}) => {id, name, login}, signin: (user: {login, password}) => {token}
  public authenticate(user: User, mode: string): Observable<User> {
    const url = mode === 'signup' ? SIGNUP : SIGNIN;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this.httpClient
      .post<User>(url, body, { headers: headers })
      .pipe(
        catchError(error => this.handleError(error)),
      );
  }

  public getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<User[]>(USERS, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public deleteUser(token: string, id: string) {
    const headers = new HttpHeaders()
      .set('accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${USERS}/${id}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public updateUser(user: User, token: string, id: string): Observable<User> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put(`${USERS}/${id}`, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public getBoards(token: string): Observable<Board[]> {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Board[]>(BOARDS, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public createBoard(token: string, board: Board): Observable<Board> {
    const body = JSON.stringify(board);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<Board>(BOARDS, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public getBoardById(token: string, id: string): Observable<Board> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Board>(`${BOARDS}/${id}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public deleteBoard(token: string, id: string) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${BOARDS}/${id}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public updateBoard(token: string, id: string, board: Board): Observable<Board> {
    const body = JSON.stringify(board);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put<Board>(`${BOARDS}/${id}`, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public getColumns(token: string, boardId: string): Observable<Column> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Column>(`${BOARDS}/${boardId}/columns`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public createColumn(token: string, boardId: string, column: Column): Observable<Column> {
    const body = JSON.stringify(column);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<Column>(`${BOARDS}/${boardId}/columns`, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public getColumnById(token: string, boardId: string, columnId: string): Observable<Column> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Column>(`${BOARDS}/${boardId}/columns/${columnId}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public deleteColumn(token: string, boardId: string, columnId: string) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${BOARDS}/${boardId}/columns/${columnId}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public updateColumn(token: string, boardId: string, columnId: string, column: Column): Observable<Column> {
    const body = JSON.stringify(column);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put<Column>(`${BOARDS}/${boardId}/columns/${columnId}`, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public getTasks(token: string, boardId: string, columnId: string): Observable<Task> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public createTask(token: string, boardId: string, columnId: string, task: Task): Observable<Task> {
    const body = JSON.stringify(task);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks`, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public getTaskById(token: string, boardId: string, columnId: string, taskId: string): Observable<Task> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public deleteTask(token: string, boardId: string, columnId: string, taskId: string) {
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .delete(`${BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }

  public updateTask(token: string, boardId: string, columnId: string, taskId: string, task: Task): Observable<Task> {
    const body = JSON.stringify(task);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .put<Task>(`${BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, body, { headers: headers })
      .pipe(
        catchError(this.handleError),
      );
  }
}
