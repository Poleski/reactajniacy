import type { Dispatch, SetStateAction} from "react";
import { useLocation } from "react-router";
import type {
    IGuessedData,
    IImageData,
    IReadyData,
    IWordData
} from "../../../models/data.models.ts";
import WordBoardItem from './WordBoardItem.tsx';
import getAllClicked from "../../../utils/getAllClicked.ts";

interface IWordBoardProps {
    words: IReadyData[];
    guesses: IGuessedData[],
    finished: boolean,
    onClick: (
        word: IReadyData,
        setter?: Dispatch<SetStateAction<string>>,
    ) => void;
}

export default function WordBoard(
    props: React.PropsWithChildren<IWordBoardProps>,
) {
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/") || pathname.includes("/bosscoop/");
    const wordCount = props.words.length;
    const gridColCount = Math.ceil(Math.sqrt(wordCount));
    const gridRowCount = Math.ceil(wordCount / gridColCount);

    const allClicked = getAllClicked(props.guesses);

    return (
        <ul
            className={`words-container grid ${isBoss ? "gap-1" : "w-3/4 gap-6"} grid-cols-${gridColCount} grid-rows-${gridRowCount} scaleImage-${gridRowCount} pb-4`}
        >
            {props.words.map((word: (IReadyData)) => {
                const alreadyGuessed = props.guesses.find((guess) => {
                    if ("pl" in guess && "pl" in word) {
                        return guess.pl === word.pl
                    }
                    if ("fileName" in guess && "fileName" in word) {
                        return guess.fileName === word.fileName;
                    }
                })

                return (
                    <WordBoardItem
                        word={alreadyGuessed ?? word}
                        key={(word as IWordData).pl ?? (word as IImageData).fileName}
                        onClick={props.onClick}
                        clicked={allClicked["pl" in word ? word.pl : word.fileName] || (props.finished ? null : false)}
                    />
                );
            })}
        </ul>
    );
}
