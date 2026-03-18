import { useContext } from "react";
import type { IImageReadyData, IReadyData, ISchema, IWordReadyData } from "../../../models/data.models.ts";
import buttonize from "../../a11y/buttonize.ts";
import MainContext from "../../Context";

interface IScoreBoardProps {
    activePlayer: number;
    playerOrder: Array<keyof ISchema>;
    score: ISchema;
    guesses: IReadyData[][];
    onChangeActivePlayer: () => void;
}

type IPlayerColorClass = {
    [key in keyof ISchema]: string;
};

export default function ScoreBoard(
    props: React.PropsWithChildren<IScoreBoardProps>,
) {
    const {lang, size, animationDelay} = useContext(MainContext);
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
    const playerColorClass: IPlayerColorClass = {
        red: "text-t-light-red picture:bg-t-light-red",
        blue: "text-t-light-blue picture:bg-t-light-blue",
        green: "text-t-light-green picture:bg-t-light-green",
        neutral: "text-t-light-neutral text-shadow-t-dark dark:text-shadow-none picture:bg-t-light-neutral",
        killer:
            "text-t-light-killer dark:text-t-dark-killer dark:text-shadow-t-light picture:bg-t-light picture:invert border-2 border-t-light dark:border-t-dark",
    };
    const guessListWidthClass =
        props.playerOrder.length === 2 ? "flex-1/2" : "flex-1/3";

    return (
        <div className="scoreboard-container w-1/4">
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
            <div className="player-scoreboard w-full my-4 mx-auto flex justify-between flex-wrap">
                {props.playerOrder.map((player) => (
                    <span
                        className={`player-score flex-auto text-center ${size === "large" ? "text-9xl" : ""} ${size === "normal" ? "text-8xl" : ""} ${size === "small" ? "text-7xl" : ""} font-black select-none ${playerColorClass[player]}`}
                        key={player}
                    >
						{props.score[player]}
					</span>
                ))}
            </div>
            <div className="player-guesses-container w-full my-4 mx-auto flex justify-between">
                {props.playerOrder.map((player) => (
                    <ul
                        key={player}
                        className={`player-guesses flex-50 text-center ${size === "large" ? "text-3xl" : ""} ${size === "normal" ? "text-3xl" : ""} ${size === "small" ? "text-2xl" : ""} font-black ${guessListWidthClass} `}
                    >
                        {props.guesses[props.playerOrder.indexOf(player)].map((guess) => (
                            <li
                                key={(guess as IWordReadyData).pl ?? (guess as IImageReadyData).fileName}
                                className={`uppercase text-center ${playerColorClass[guess.role]} ${"fileName" in guess && "picture rounded-xl mx-4 mb-2 text-[0px]"}`}
                            >
                                {"pl" in guess && "en" in guess && (
                                    <p>{(guess as IWordReadyData)[lang]}</p>
                                )}
                                {"fileName" in guess && (
                                    <picture className="inline-block">
                                        <source srcSet={`/pictures/${(guess as IImageReadyData).fileName}`}/>
                                        <img src={`/pictures/${(guess as IImageReadyData).fileName}`}
                                             className="max-h-16" alt={(guess as IImageReadyData).fileName}/>
                                    </picture>
                                )}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}
