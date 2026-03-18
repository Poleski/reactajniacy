import type { Dispatch, SetStateAction } from "react";
import type {
    IAllClicked,
    IReadyData,
    ISchemaPlayersOnly
} from "../models/data.models";

type ISetActivePlayer = Dispatch<SetStateAction<number>>;
type ISetScore = Dispatch<SetStateAction<ISchemaPlayersOnly>>;
type ISetGuess = Dispatch<SetStateAction<IReadyData[][]>>;
type ISetAllClicked = Dispatch<SetStateAction<IAllClicked>>;

export interface IGameStateData {
    activePlayer: number;
    score: ISchemaPlayersOnly;
    guesses: IReadyData[][];
    allClicked: IAllClicked;
}

export type IGameStateDataFragment = Partial<IGameStateData>

const emptyData: IGameStateData = {
    activePlayer: 0,
    score: {red: 10, blue: 10},
    guesses: [[], []],
    allClicked: {},
};

export const getSaveGame = (id: string) => {
    return (data: IGameStateDataFragment) => {
        const loadedDataRaw = localStorage.getItem(id);
        const loadedData: IGameStateData = loadedDataRaw
            ? JSON.parse(loadedDataRaw)
            : emptyData;
        if (typeof data.activePlayer !== "undefined") {
            loadedData.activePlayer = data.activePlayer;
        }
        if (data.score) {
            loadedData.score = data.score;
        }
        if (data.guesses) {
            loadedData.guesses = data.guesses;
        }
        if (data.allClicked) {
            loadedData.allClicked = data.allClicked;
        }

        localStorage.setItem(id, JSON.stringify(loadedData));
    };
};

export const getLoadGame = (
    setActivePlayer: ISetActivePlayer,
    setScore: ISetScore,
    setGuesses: ISetGuess,
    setAllClicked: ISetAllClicked,
    id: string,
) => {
    return () => {
        const loadedDataRaw = localStorage.getItem(id);
        if (loadedDataRaw === null) {
            return;
        }

        const loadedData: IGameStateData = JSON.parse(loadedDataRaw);

        setActivePlayer(loadedData.activePlayer);
        setScore(loadedData.score);
        setGuesses(loadedData.guesses);
        setAllClicked(loadedData.allClicked);
    };
};
