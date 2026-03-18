import { type Dispatch, type SetStateAction, Suspense, useContext, useEffect, useMemo, useState, } from "react";
import { Await, useLoaderData, useNavigate, useParams } from "react-router";
import type {
    IAllClicked,
    IImageReadyData,
    IMessages,
    IReadyData,
    ISchema,
    ISchemaPlayersOnly,
    IWordReadyData
} from "../../models/data.models";
import { getLoadGame, getSaveGame } from "../../utils/getSaveAndLoadGame";
import setInitialData from "../../utils/setInitialData";
import MainContext from "../Context";
import ScoreBoard from "./board-elements/ScoreBoard.tsx";
import WordBoard from "./board-elements/WordBoard.tsx";

interface IInitialData {
    initialScore: ISchemaPlayersOnly;
    initialPlayer: number;
    initialGuesses: IReadyData[][];
    initialClicked: IAllClicked;
}

interface IFinishGameTypeReplacement {
    pl: string[],
    en: string[],
    team: ("red" | "blue" | "green")[]
}

export default function Board() {
    // preparation
    const playerOrder: Array<keyof ISchemaPlayersOnly> = ["red", "blue"];
    const {openModal, animationDelay} = useContext(MainContext);
    const navigate = useNavigate();
    const data: { words: IWordReadyData[]; schemaMap: (keyof ISchema)[] } =
        useLoaderData();
    const {initialScore, initialPlayer, initialGuesses, initialClicked} =
        useMemo<IInitialData>(() => {
            return setInitialData(data);
        }, [data]);

    if (initialGuesses.length === 3) {
        playerOrder.push("green");
    }

    // states
    const [activePlayer, setActivePlayer] = useState(initialPlayer);
    const [score, setScore] = useState(initialScore);
    const [guesses, setGuesses] = useState(initialGuesses);
    const [allClicked, setAllClicked] = useState(initialClicked);

    // save/load
    const gameParams = useParams();
    const gameStateId = [gameParams.type, gameParams.set, gameParams.seed].join(
        "-",
    );
    const saveGame = useMemo(() => {
        return getSaveGame(gameStateId);
    }, [gameStateId]);
    const loadGame = useMemo(() => {
        return getLoadGame(
            setActivePlayer,
            setScore,
            setGuesses,
            setAllClicked,
            gameStateId,
        );
    }, [gameStateId]);

    // handlers
    const handleChangeActivePlayer = (forcedActive?: number) => {
        if (forcedActive) {
            saveGame({activePlayer: forcedActive});
            setActivePlayer(forcedActive);
            return;
        }

        if (activePlayer === playerOrder.length - 1) {
            saveGame({activePlayer: 0});
            setActivePlayer(0);
        } else {
            setActivePlayer((prev) => {
                saveGame({activePlayer: prev + 1});
                return prev + 1;
            });
        }
    };

    const handleGuess = (guess: IReadyData) => {
        setGuesses((prev) => {
            const newGuesses = [...prev];
            if (!newGuesses[activePlayer].includes(guess as IWordReadyData & IImageReadyData)) {
                newGuesses[activePlayer].push(guess as IWordReadyData & IImageReadyData);
            }
            saveGame({guesses: newGuesses});
            return newGuesses;
        });

        if (guess.role === "killer" || guess.role === "neutral") {
            return;
        }

        if (playerOrder.includes(guess.role)) {
            setScore((prev) => {
                const newScore: ISchemaPlayersOnly = {...prev};
                const role: keyof ISchemaPlayersOnly =
                    guess.role as keyof ISchemaPlayersOnly;
                if (newScore[role]) {
                    newScore[role]--;
                }

                if (newScore[role] === 0) {
                    handleChangeActivePlayer(playerOrder.indexOf(role));
                    finishGame("finished");
                }

                saveGame({score: newScore});
                return newScore;
            });
        }
    };

    const handleClickWithModal = (
        guess: IReadyData,
        setter?: Dispatch<SetStateAction<string>>,
    ) => {
        const type = "guess";
        const replacement = guess;
        const yesCallback = () => {
            setAllClicked((prev) => {
                const newClicked = {...prev};
                if ("fileName" in guess) {
                    newClicked[guess.fileName] = true;
                } else {
                    newClicked[guess.pl] = true;
                }

                saveGame({allClicked: newClicked});
                return newClicked;
            });
            if (setter) {
                setter("");
            }
            setTimeout(() => {
                handleGuess(guess);
                if (guess.role === "killer") {
                    finishGame("killerFound");
                } else if (guess.role !== playerOrder[activePlayer]) {
                    handleChangeActivePlayer();
                }
            }, animationDelay)
        };
        const noCallback = () => {
            if (setter) {
                setter("");
            }
        };

        openModal({type, replacement, yesCallback, noCallback});
    };

    const finishGame = (type: keyof IMessages) => {
        const typeReplacement: IFinishGameTypeReplacement = {
            pl: ["Czerwoni", "Niebiescy"],
            en: ["Red team", "Blue team"],
            team: ["red", "blue"]
        };

        if (playerOrder.length === 3) {
            typeReplacement.pl.push("Zieloni");
            typeReplacement.en.push("Green team")
            typeReplacement.team.push("green")
        }

        if (type === "killerFound") {
            typeReplacement.pl = typeReplacement.pl.filter((_x, index) => index !== activePlayer);
            typeReplacement.en = typeReplacement.en.filter((_x, index) => index !== activePlayer);
            typeReplacement.team = typeReplacement.team.filter((_x, index) => index !== activePlayer);
        }

        let replacement = {
            pl: typeReplacement.pl[0],
            en: typeReplacement.en[0],
        };

        if (typeReplacement.team.length > 1 && typeReplacement.team[0] && typeReplacement.team[1] && score.green) {

            // code below could be made shorter, but since it's critical check, I've made it very readable
            // ts incorrectly see "green" as possibly undefined, hence the assertion
            if (score[typeReplacement.team[0] as ("red" | "blue")] > score[typeReplacement.team[1] as ("red" | "blue")]) {
                replacement = {
                    pl: typeReplacement.pl[1],
                    en: typeReplacement.en[1],
                };
            } else if (score[typeReplacement.team[0] as ("red" | "blue")] < score[typeReplacement.team[1] as ("red" | "blue")]) {
                replacement = {
                    pl: typeReplacement.pl[0],
                    en: typeReplacement.en[0],
                };
            } else {
                replacement = {
                    pl: "Obie pozostałe drużyny",
                    en: "Both remaining teams",
                };
            }
        }

        const yesCallback = () => {
            cleanup();
            navigate(`/?prevType=${gameParams.type}&prevSets=${gameParams.set}`);
        };

        const noCallback = () => {
        };

        setAllClicked((prev) => {
            const newClicked = {...prev};
            for (const word of Object.keys(newClicked)) {
                if (newClicked[word] === false) {
                    newClicked[word] = null;
                }
            }
            return newClicked;
        });

        setTimeout(() => {
            openModal({type, replacement, yesCallback, noCallback});
        }, 1000);
    };

    const cleanup = () => {
        setActivePlayer(initialPlayer);
        setScore(initialScore);
        setGuesses(initialGuesses);
        setAllClicked(initialClicked);
    }

    useEffect(() => {
        cleanup();
        const loadedDataRaw = localStorage.getItem(gameStateId);
        const loadedData = loadedDataRaw && JSON.parse(loadedDataRaw);
        if (loadedData && loadedData.guesses.flat().length > 0) {
            const type = "load";
            const replacement = {
                pl: gameStateId,
                en: gameStateId,
            };
            const yesCallback = () => {
                loadGame();
                if (
                    loadedData.guesses
                        .flat()
                        .find((word: IWordReadyData) => word.role === "killer")
                ) {
                    finishGame("killerFound");
                } else if (Object.values(loadedData.score).includes(0)) {
                    setActivePlayer(Object.values(loadedData.score).indexOf(0));
                    finishGame("finished");
                }
            };
            const noCallback = () => {
                localStorage.removeItem(gameStateId);
            };

            openModal({type, replacement, yesCallback, noCallback});
        } else if (!loadedData) {
            openModal({type: "qrCode"});
            saveGame({
                activePlayer,
                score: initialScore,
                guesses: initialGuesses,
                allClicked: initialClicked,
            });
        }

        return cleanup;
    }, []);

    return (
        <Suspense fallback={<p>loading</p>}>
            <Await resolve={data}>
                <div
                    className={`game-container flex gap-8 ${activePlayer === 0 ? "active-red" : ""}${activePlayer === 1 ? "active-blue" : ""}${activePlayer === 2 ? "active-green" : ""}`}
                    role="application"
                >
                    <ScoreBoard
                        activePlayer={activePlayer}
                        score={score}
                        guesses={guesses}
                        playerOrder={playerOrder}
                        onChangeActivePlayer={() => {
                            handleChangeActivePlayer();
                        }}
                    />
                    <WordBoard
                        words={data.words}
                        onClick={handleClickWithModal}
                        allClicked={allClicked}
                    />
                </div>
            </Await>
        </Suspense>
    );
}
