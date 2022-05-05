import { Board } from '../models/board.model';
import { boardsReducer } from './reducer';

export interface BoardsState {
  boards: Board[],
}

export interface State {
  boards: BoardsState,
}

export const reducers = {
  boards: boardsReducer,
};
