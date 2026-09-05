import { useContext } from "react";
import type { IGuessedData, IReadyData, ISchemaPlayersOnly } from "../../../models/data.models.ts";
import type { IGameStateData, IGameStateDataFragment } from "../../../models/board.models.ts";
import MainContext from "../../Context.tsx";

interface IUseHandleGuessProps {
    state: {
        activePlayer: number
        guesses: IGuessedData[]
    },
    dispatch: React.ActionDispatch<[action: {
        type: keyof IGameStateData
        payload: number | IGuessedData[]
    }]>,
    coop: boolean,
    playerOrder: Array<keyof ISchemaPlayersOnly>,
    saveGame: (data: IGameStateDataFragment) => void,
    handleChangeActivePlayer: () => void;
}

const useHandleGuess = (props: IUseHandleGuessProps) => {
    const { animationDelay } = useContext(MainContext);

    return (guess: IReadyData) => {
        const processedGuess = {...guess, guessedBy: props.state.activePlayer}
        props.dispatch({type: "guesses", payload: [...props.state.guesses, processedGuess]});
        props.saveGame({guesses: [...props.state.guesses, processedGuess]});

        setTimeout(() => {
            const roleToCompare = props.coop ? "red" : props.playerOrder[props.state.activePlayer]
            if (guess.role !== roleToCompare) {
                props.handleChangeActivePlayer();
            }
        }, animationDelay)
    }
}

export default useHandleGuess;
