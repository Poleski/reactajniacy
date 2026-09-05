import { type Dispatch, type SetStateAction, useContext } from "react";
import { type Params, useNavigate } from "react-router";
import type { IModalData } from "../../../models/context.models.ts";
import type { IFinishGameCoopProps } from "../../../models/data.models.ts";
import getFinishGameMessageReplacement from "../../../utils/getFinishGameMessageReplacement.ts";
import MainContext from "../../Context.tsx";

interface IUseFinishGame {
    coop: boolean,
    params: Readonly<Params<string>>
    setFinished: Dispatch<SetStateAction<boolean>>,
    cleanup: () => void,
}

const useFinishGame = (props: IUseFinishGame) => {
    const { openModal } = useContext(MainContext);
    const navigate = useNavigate();

    return (winner: number, killer: boolean, coopProps?: IFinishGameCoopProps) => {
        const modalObject: IModalData = {
            type: killer ? "killerFound" : "finished"
        };

        if (props.coop) {
            modalObject.type = killer ? "killerFoundCoop" : "finishedCoop";
        } else {
            modalObject.replacement = getFinishGameMessageReplacement(winner);
        }

        if (coopProps) {
            modalObject.coopProps = coopProps;
        }

        modalObject.yesCallback = () => {
            props.cleanup();
            let redirectUrl = `/?prevType=${props.params.type}&prevSets=${props.params.set}`
            if (props.coop) {
                redirectUrl += "&coop=true"
            }
            navigate(redirectUrl);
        };

        props.setFinished(true);

        setTimeout(() => {
            openModal(modalObject)
        }, 1000);
    }
}

export default useFinishGame;
