import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, pluck, switchMap } from "rxjs";
import { ApiService } from "../core/services/api";
import { SaveBoards, StateActions } from "./actions";

@Injectable()
export class BoardEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}

  public getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StateActions.GET_BOARDS),
      pluck('token'),
      switchMap((action) => this.apiService.getBoards(action)),
      map(boards => {return new SaveBoards(boards)})
    )
  })
}
