import type { IReadyData } from "../../../models/data.models.ts";
import { type Dispatch, type SetStateAction, useContext } from "react";
import MainContext from "../../Context.tsx";

interface IUseHandleGuessWithModalProps {
    handleGuess: (guess: IReadyData) => void;
}

const useHandleGuessWithModal = (props: IUseHandleGuessWithModalProps) => {
    const { openModal } = useContext(MainContext);

    return (
        guess: IReadyData,
        setter?: Dispatch<SetStateAction<string>>,
    ) => {
        const type = "guess";
        const replacement = guess;
        const yesCallback = () => {
            if (setter) {
                setter("");
            }
            props.handleGuess(guess);
        };
        const noCallback = () => {
            if (setter) {
                setter("");
            }
        };

        openModal({type, replacement, yesCallback, noCallback});
    }
}

export default useHandleGuessWithModal;
