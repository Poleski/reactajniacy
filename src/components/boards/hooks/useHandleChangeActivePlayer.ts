import type { Dispatch, SetStateAction } from "react";
import type { IDataCoop, IGuessedData, IReadyData, ISchemaPlayersOnly } from "../../../models/data.models.ts";
import type { IBoardState, IGameStateData, IGameStateDataFragment } from "../../../models/board.models.ts";
import getPlayerWords from "../../../utils/getPlayerWords.ts";
interface IUseHandleChangeActivePlayerProps {
    state: IBoardState,
    dispatch: React.ActionDispatch<[action: {
        type: keyof IGameStateData
        payload: number | IGuessedData[]
    }]>,
    coop: boolean,
    playerOrder: Array<keyof ISchemaPlayersOnly>,
    data: IDataCoop,
    saveGame: (data: IGameStateDataFragment) => void,
    setWords: Dispatch<SetStateAction<IReadyData[]>>
}

const useHandleChangeActivePlayer = (props: IUseHandleChangeActivePlayerProps) => {
    return () => {
        const newPlayer = props.state.activePlayer === props.playerOrder.length - 1 ? 0 : props.state.activePlayer + 1;
        if (props.coop) {
            props.setWords(getPlayerWords(props.data, newPlayer));
        }
        props.dispatch({type: "activePlayer", payload: newPlayer});
        props.saveGame({activePlayer: newPlayer, changeCount: props.state.changeCount + 1});
    }
}

export default useHandleChangeActivePlayer;
