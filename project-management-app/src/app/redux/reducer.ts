import { BoardsState } from ".";
import { SaveBoards, StateActions } from "./actions";

const boardsInitialState: BoardsState = {
  boards: [],
};

export function boardsReducer(state: BoardsState = boardsInitialState, action: SaveBoards): BoardsState {
  switch (action.type) {
    case StateActions.SAVE_BOARDS:
      return {
        ...state,
        boards: action.boards,
      };
    default:
      return state;
  }
}
