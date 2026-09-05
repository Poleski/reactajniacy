import type { IGuessedData } from "./data.models.ts";

export interface IGameStateData {
    activePlayer: number;
    guesses: IGuessedData[];
    changeCount: number;
}

export type IGameStateDataFragment = Partial<IGameStateData>

export interface IBoardState extends IGameStateData {
    changeCount: number;
}
