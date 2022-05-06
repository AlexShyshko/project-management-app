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
      switchMap((action) => this.apiService.getBoards(action)
        .pipe(
          map(boards => {
            const x = boards.map(board => {
              let b = {...board};
              this.apiService.getColumns(action, board.id!).subscribe(col => b.columns = col);
              console.log('x',b);
              return b;
            });
            //console.log('x',x);
            return x;
          }),
        ),
      ),
      map(boards => {console.log(boards);
        return new SaveBoards(boards)})
    )
  })
}
