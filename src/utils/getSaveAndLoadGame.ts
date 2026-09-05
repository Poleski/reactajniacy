import type { Dispatch } from "react";
import type { IGameStateData, IGameStateDataFragment } from "../models/board.models.ts";

const emptyData: IGameStateData = {
    activePlayer: 0,
    guesses: [],
    changeCount: 0,
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
        if (data.guesses) {
            loadedData.guesses = data.guesses;
        }
        if (data.changeCount) {
            loadedData.changeCount = data.changeCount;
        }
        console.log('saving!');

        localStorage.setItem(id, JSON.stringify(loadedData));
    };
};

type DispatchType<T> = {
    type: keyof T;
    payload: T[keyof T]
}

export const getLoadGame = (
    dispatch: Dispatch<DispatchType<IGameStateData>>,
    id: string
) => {
    return () => {
        const loadedDataRaw = localStorage.getItem(id);
        if (loadedDataRaw === null) {
            return;
        }

        const loadedData: IGameStateData = JSON.parse(loadedDataRaw);

        dispatch({type: "activePlayer", payload: loadedData.activePlayer});
        dispatch({type: "guesses", payload: loadedData.guesses});
        dispatch({type: "changeCount", payload: loadedData.changeCount});
    };
};
