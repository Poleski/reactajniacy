import { useContext } from "react";
import { motion } from "motion/react";
import type {
    IImageData,
    IGuessedData,
    ISchema,
    IWordData, ISchemaPlayersOnly
} from "../../../models/data.models.ts";
import MainContext from "../../Context";
import { ScoreBoardToggle } from "./ScoreBoardToggle.tsx";


interface IScoreBoardProps {
    activePlayer: number;
    playerOrder: Array<keyof ISchemaPlayersOnly>;
    score: ISchemaPlayersOnly;
    guesses: IGuessedData[];
    changeCount: number;
    onChangeActivePlayer: () => void;
}

type IPlayerColorClass = {
    [key in keyof ISchema]: string;
};

export function ScoreBoard(
    props: React.PropsWithChildren<IScoreBoardProps>,
) {
    const {lang, size, animationDelay} = useContext(MainContext);
    const playerColorClass: IPlayerColorClass = {
        red: "text-t-light-red picture:bg-t-light-red coop:text-t-light-coop picture:coop:bg-t-light-coop",
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
                <ScoreBoardToggle
                    activePlayer={props.activePlayer}
                    playerOrder={props.playerOrder}
                    changeCount={props.changeCount}
                    onChangeActivePlayer={props.onChangeActivePlayer}
                />
            </div>
            <div className="player-scoreboard w-full my-4 mx-auto flex justify-between flex-wrap">
                {props.playerOrder.map((player) => {
                    if (props.score[player] !== undefined) {
                        return (
                            <span
                                className={`player-score flex-auto text-center ${size === "large" ? "text-9xl" : ""} ${size === "normal" ? "text-8xl" : ""} ${size === "small" ? "text-7xl" : ""} font-black select-none ${playerColorClass[player]}`}
                                key={player}
                            >
                            {(props.score)[player]}
                        </span>
                        )
                    }
                })}
            </div>
            <div className="player-guesses-container w-full my-4 mx-auto flex justify-between">
                {props.playerOrder.map((player, index) => (
                    <ul
                        key={player}
                        className={`player-guesses flex-50 text-center ${size === "large" ? "text-3xl" : ""} ${size === "normal" ? "text-3xl" : ""} ${size === "small" ? "text-2xl" : ""} font-black ${guessListWidthClass}`}
                    >
                        {props.guesses.filter((guess) => guess.guessedBy === index).map((guess) => (
                            <motion.li
                                key={(guess as IWordData).pl ?? (guess as IImageData).fileName}
                                className={`uppercase text-center ${playerColorClass[guess.role]} ${"fileName" in guess && "picture rounded-xl mx-4 mb-2 text-[0px]"}`}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{
                                    delay: animationDelay / 1000,
                                    duration: animationDelay / 1000
                                }}
                            >
                                {"pl" in guess && "en" in guess && (
                                    <p>{(guess as IWordData)[lang]}</p>
                                )}
                                {"fileName" in guess && (
                                    <picture className="inline-block">
                                        <source srcSet={`/pictures/${(guess as IImageData).fileName}`}/>
                                        <img src={`/pictures/${(guess as IImageData).fileName}`}
                                             className="max-h-16" alt={(guess as IImageData).fileName}/>
                                    </picture>
                                )}
                            </motion.li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}
