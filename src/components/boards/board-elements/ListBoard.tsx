import { useContext } from "react";
import type { IGuessedData, IImageData, IReadyData, IWordData } from "../../../models/data.models.ts";
import MainContext from "../../Context";
import ListBoardItem from "./ListBoardItem.tsx";
import getAllClicked from "../../../utils/getAllClicked.ts";
import type { IContext } from "../../../models/context.models.ts";

interface IListBoardProps {
    words: IReadyData[];
    guesses: IGuessedData[];
    onClick: (word: IReadyData) => void;
    bossView: IContext["bossView"];
}

interface ISortedWords {
    red: IReadyData[];
    blue: IReadyData[];
    green: IReadyData[];
    neutral: IReadyData[];
    killer: IReadyData[];
}

export default function ListBoard(
    props: React.PropsWithChildren<IListBoardProps>,
) {
    const { lang } = useContext(MainContext);
    const allClicked = getAllClicked(props.guesses);
    const sortedWords: ISortedWords = {
        red: [],
        blue: [],
        green: [],
        neutral: [],
        killer: []
    };

    for (const word of props.words) {
        if (word.role in sortedWords) {
            sortedWords[word.role as keyof Omit<ISortedWords, "npc">].push(word);
        }
    }

    for (const key of Object.keys(sortedWords) as Array<keyof ISortedWords>) {
        sortedWords[key] = sortedWords[key]?.sort((a, b) => {
            if ("fileName" in a && "fileName" in b) {
                return a.fileName.localeCompare(b.fileName)
            }
            if ("pl" in a && "pl" in b) {
                const tempLang = lang === "pl" ? "pl" : "en";
                return a[tempLang].localeCompare(b[tempLang]);
            }
            return 1;
        });
    }

    // true only for non-coop games
    if (sortedWords.blue.length !== 0) {
        sortedWords.neutral = [...sortedWords.killer, ...sortedWords.neutral];
        sortedWords.killer = [];
    }

    const handleClick = (word: IReadyData) => {
        props.onClick(word);
    };

    return (
        <div className={`flex justify-center ${props.bossView === "both" ? "" : "text-lg flex-wrap"}`}>
            {(Object.keys(sortedWords) as (keyof ISortedWords)[]).map((wordList) => (
                <div key={wordList}>
                    {sortedWords[wordList] && sortedWords[wordList].length > 0 && (
                        <ul className="px-4 pb-2 flex flex-col flex-wrap">
                            {sortedWords[wordList].map((word) => {
                                return (
                                    <ListBoardItem
                                        word={word}
                                        key={(word as IWordData).pl ?? (word as IImageData).fileName}
                                        onClick={handleClick}
                                        clicked={allClicked["pl" in word ? word.pl : word.fileName]}
                                    />
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    )
}

