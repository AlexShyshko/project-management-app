import { Action } from "@ngrx/store";
import { Board } from "../models/board.model";

export enum StateActions {
  GET_BOARDS = '[board page] get boards',
  SAVE_BOARDS = '[board page] save boards',
}

export class GetBoards implements Action {
  readonly type = StateActions.GET_BOARDS;

  constructor(public token: string) {}
}

export class SaveBoards implements Action {
  readonly type = StateActions.SAVE_BOARDS;

  constructor(public boards: Board[]) {}
}
