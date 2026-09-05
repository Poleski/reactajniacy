import { Suspense, useContext, useEffect, useState } from "react";
import { Await, useLoaderData, useOutletContext, useParams } from "react-router";
import type { IData, IDataCoop, IGuessedData, IImageData, IReadyData, IWordData } from "../../models/data.models";
import type { IOutletContext } from "../../models/context.models.ts";
import MainContext from "../Context";
import ListBoard from "./board-elements/ListBoard.tsx";
import WordBoard from "./board-elements/WordBoard.tsx";
import getPlayerWords from "../../utils/getPlayerWords.ts";


export default function BossBoard() {
    const data: IData =
        useLoaderData();
    const { bossView } = useContext(MainContext);
    const [guesses, setGuesses] = useState<IGuessedData[]>([]);
    const { player } = useParams();
    const outletContext = useOutletContext<IOutletContext>();
    const isCoop = Array.isArray(data.words[0]);

    const words = !isCoop ? data.words : getPlayerWords(data as IDataCoop, Number.parseInt(player || "0"))

    const handleClick = (guess: IReadyData) => {
        const oldGuesses = [...guesses];
        const guessIndex = oldGuesses.findIndex((oldGuess) => {
            if ("pl" in guess) {
                return (oldGuess as IWordData).pl === guess.pl
            }
            return (oldGuess as IImageData).fileName === guess.fileName;
        });

        if (guessIndex > -1) {
            oldGuesses.splice(guessIndex, 1);
        } else {
            const editedGuess = {...guess, guessedBy: 0}
            oldGuesses.push(editedGuess);
        }

        setGuesses(oldGuesses);
    };

    useEffect(() => {
        if (player) {
            if (player === "0") {
                outletContext.setBgColor("red")
            } else if (player === "1") {
                outletContext.setBgColor("blue")
            } else if (player === "2") {
                outletContext.setBgColor("green")
            }
        }
    }, [player])

    return (
        <Suspense fallback={<p>loading</p>}>
            <Await resolve={data}>
                <div
                    className={`game-container ${isCoop ? "coop" : ""}`}
                    role="application"
                >
                    {(bossView === "grid" || bossView === "both") && (
                        <WordBoard
                            words={words as IReadyData[]}
                            onClick={handleClick}
                            guesses={guesses}
                            finished={false}
                        />
                    )}
                    {(bossView === "list" || bossView === "both") && (
                        <ListBoard
                            words={isCoop ? words as IReadyData[] : data.words as IReadyData[]}
                            onClick={handleClick}
                            guesses={guesses}
                            bossView={bossView}
                        />
                    )}
                </div>
            </Await>
        </Suspense>
    );
}
