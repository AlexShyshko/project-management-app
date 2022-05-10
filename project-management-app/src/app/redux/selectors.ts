import { createSelector } from '@ngrx/store';
import { BoardsState, State } from '.';

export const boardStateSelector = (state: State) => state.boards;

export const selectBoards = createSelector(boardStateSelector, (state: BoardsState) => state.boards);
