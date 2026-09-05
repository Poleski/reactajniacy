import type { IBoardState } from "../models/board.models.ts";

const BoardReducer = <T extends IBoardState, U extends IBoardState>(state: T, action: {type: keyof U, payload: U[keyof U]}): T => {
    switch (action.type) {
        case "activePlayer":
            return {...state, activePlayer: action.payload, changeCount: state.changeCount + 1};
        case "guesses":
            return {...state, guesses: action.payload};
        case "changeCount":
            return {...state, changeCount: action.payload};
        default:
            return state;
    }
}

export default BoardReducer;
