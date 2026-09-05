import { Suspense, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Await, useLoaderData, useOutletContext, useParams } from "react-router";
import type {
    IData,
    IDataCoop,
    IReadyData,
    ISchemaPlayersOnly,
} from "../../models/data.models";
import MainContext from "../Context";
import { ScoreBoard } from "./board-elements/ScoreBoard.tsx";
import WordBoard from "./board-elements/WordBoard.tsx";
import BoardReducer from "../../state/BoardReducer.ts";
import useHandleGuess from "./hooks/useHandleGuess.ts";
import useHandleChangeActivePlayer from "./hooks/useHandleChangeActivePlayer.ts";
import useHandleGuessWithModal from "./hooks/useHandleGuessWithModal.ts";
import useFinishGame from "./hooks/useFinishGame.ts";
import getScore from "../../utils/getScore.ts";
import { getLoadGame, getSaveGame } from "../../utils/getSaveAndLoadGame";
import setInitialData from "../../utils/setInitialData";
import getPlayerWords from "../../utils/getPlayerWords.ts";
import type { IOutletContext } from "../../models/context.models.ts";
import getMaxGuessed from "../../utils/getMaxGuessed.ts";

interface IBoardProps {
    coop: boolean;
}

export default function Board(
    props: React.PropsWithChildren<IBoardProps>,
) {
    // preparation
    const playerOrder: Array<keyof ISchemaPlayersOnly> = ["red", "blue"];
    const { openModal } = useContext(MainContext);
    const data: IData = useLoaderData();
    const gameParams = useParams();
    const outletContext = useOutletContext<IOutletContext>();

    const {initialScore, initialPlayer, initialGuesses} =
        useMemo(() => {
            return setInitialData(data.schemaMap, props.coop, gameParams.seed);
        }, [data]);

    if (initialGuesses.length === 3) {
        playerOrder.push("green");
    }

    const [state, dispatch] = useReducer(BoardReducer, {
        activePlayer: initialPlayer,
        guesses: initialGuesses,
        changeCount: 0,
    });

    const [words, setWords] = useState<IReadyData[]>(props.coop ? getPlayerWords(data as IDataCoop, initialPlayer) : [])
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(initialScore);

    // save/load
    let gameStateId = [gameParams.type, gameParams.set, gameParams.seed].join(
        "-",
    );
    if (props.coop) {
        gameStateId = `coop-${gameStateId}`;
    }
    const saveGame = useMemo(() => {
        return getSaveGame(gameStateId);
    }, [gameStateId]);
    const loadGame = useMemo(() => {
        return getLoadGame(
            dispatch,
            gameStateId,
        );
    }, [gameStateId]);

    const cleanup = () => {
        dispatch({type: "activePlayer", payload: initialPlayer});
        dispatch({type: "guesses", payload: initialGuesses});
        dispatch({type: "changeCount", payload: 0});
        setFinished(false)
    }

    // handlers
    const handleChangeActivePlayer = useHandleChangeActivePlayer({
        state,
        dispatch,
        coop: props.coop,
        playerOrder,
        saveGame,
        data: data as IDataCoop,
        setWords
    })

    const handleGuess = useHandleGuess({
        state,
        dispatch,
        coop: props.coop,
        playerOrder,
        saveGame,
        handleChangeActivePlayer
    })

    const handleGuessWithModal = useHandleGuessWithModal({
        handleGuess
    })

    const finishGame = useFinishGame({
        coop: props.coop,
        params: gameParams,
        setFinished,
        cleanup
    })

    // useEffects
    useEffect(() => {
        cleanup();
        const loadedDataRaw = localStorage.getItem(gameStateId);
        const loadedData = loadedDataRaw && JSON.parse(loadedDataRaw);
        if (loadedData && loadedData.guesses.length > 0) {
            const type = "load";
            const replacement = {
                pl: gameStateId,
                en: gameStateId,
            };
            const yesCallback = () => {
                loadGame();
            };
            const noCallback = () => {
                localStorage.removeItem(gameStateId);
            };

            openModal({type, replacement, yesCallback, noCallback});
        } else if (!loadedData) {
            openModal({type: "qrCode"});
            saveGame({
                activePlayer: state.activePlayer,
                guesses: initialGuesses
            });
        }

        outletContext.setCoop(props.coop && playerOrder);

        return cleanup;
    }, []);

    useEffect(() => {
        // killer check
        const isKiller = state.guesses.find((guess) => guess.role === "killer");
        if (isKiller) {
            finishGame(isKiller.guessedBy, true);
            return;
        }

        // score check
        if (props.coop) {
            const scoringGuesses = state.guesses.filter(guess => guess.role === 'red').length;
            setScore({
                red: scoringGuesses
            });
            const guessedWords = state.guesses.map((guess) => {
                if ("pl" in guess) {
                    return guess.pl
                }
                return guess.fileName
            })
            const availableToGuess = (data as IDataCoop).words.flat().filter(word => word.role === "red").filter(word => {
                if ("pl" in word) {
                    return !guessedWords.includes(word.pl)
                }
                return !guessedWords.includes(word.fileName)
            })

            if (availableToGuess.length === 0) {
                finishGame(0, false, {
                    guessed: state.guesses.filter(guess => guess.role === "red").length,
                    maxGuessed: getMaxGuessed((data as IDataCoop).schemaMap),
                    changeCount: state.changeCount + 1,
                });
            }
        } else {
            const updatedScore = getScore(initialScore as ISchemaPlayersOnly, state.guesses);
            setScore(updatedScore);
            const isWinner = Object.values(updatedScore).findIndex(score => score === 0);
            if (isWinner > -1) {
                finishGame(isWinner, false);
            }
        }

    }, [state.guesses]);

    return (
        <Suspense fallback={<p>loading</p>}>
            <Await resolve={data}>
                <div
                    className={`game-container flex gap-8 ${state.activePlayer === 0 ? "active-red" : ""}${state.activePlayer === 1 ? "active-blue" : ""}${state.activePlayer === 2 ? "active-green" : ""} ${props.coop ? "coop" : ""}`}
                    role="application"
                >
                    <ScoreBoard
                        activePlayer={state.activePlayer}
                        guesses={state.guesses}
                        playerOrder={playerOrder}
                        onChangeActivePlayer={() => {
                            handleChangeActivePlayer();
                        }}
                        score={score}
                        changeCount={state.changeCount}
                    />
                    <WordBoard
                        words={props.coop ? words : data.words as IReadyData[]}
                        onClick={handleGuessWithModal}
                        guesses={state.guesses}
                        finished={finished}
                    />
                </div>
            </Await>
        </Suspense>
    );
}
