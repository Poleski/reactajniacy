import buttonize from "../../a11y/buttonize.ts";
import { useContext } from "react";
import type { ISchemaPlayersOnly } from "../../../models/data.models.ts";
import MainContext from "../../Context.tsx";

interface IScoreBoardToggleProps {
    activePlayer: number;
    playerOrder: Array<keyof ISchemaPlayersOnly>;
    changeCount: number | false;
    onChangeActivePlayer: () => void;
}

export function ScoreBoardToggle(
    props: React.PropsWithChildren<IScoreBoardToggleProps>,
) {
    const { animationDelay } = useContext(MainContext);

    const toggleClass =
        props.activePlayer === 0
            ? "bg-t-light-red"
            : props.activePlayer === 1
                ? "bg-t-light-blue"
                : "bg-t-light-green";

    const toggleIconClass =
        props.activePlayer === 0
            ? "-left-1/50"
            : props.activePlayer === 2 ||
            (props.activePlayer === 1 && props.playerOrder.length === 2)
                ? "left-51/50 -translate-x-1/1"
                : "left-[50%] -translate-x-1/2";

    return (
        <div className="player-toggle-container center">
            <button
                className={`block toggle relative border-2 rounded-full w-full max-w-48 h-16 my-4 mx-auto cursor-pointer ${toggleClass}`}
                {...buttonize(props.onChangeActivePlayer)}
                style={{transition: `background ${animationDelay}ms ease`}}
            >
                <div
                    className={`toggle-icon absolute bg-white w-16 h-16 rounded-full -top-0.5 border-2 ${toggleIconClass}`}
                    style={{transition: `all ${animationDelay}ms ease `}}
                />
            </button>
        </div>
    )
}