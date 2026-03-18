import type { Dispatch, SetStateAction} from "react";
import { useLocation } from "react-router";
import type { IAllClicked, IImageReadyData, IReadyData, IWordReadyData } from "../../../models/data.models.ts";
import WordBoardItem from './WordBoardItem.tsx';
interface IWordBoardProps {
    words: IReadyData[];
    allClicked: IAllClicked;
    onClick: (
        word: IReadyData,
        setter?: Dispatch<SetStateAction<string>>,
    ) => void;
}

export default function WordBoard(
    props: React.PropsWithChildren<IWordBoardProps>,
) {
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/");
    const wordCount = props.words.length;
    const gridColCount = Math.ceil(Math.sqrt(wordCount));
    const gridRowCount = Math.ceil(wordCount / gridColCount);

    return (
        <ul
            className={`words-container grid ${isBoss ? "gap-1" : "w-3/4 gap-6"} grid-cols-${gridColCount} grid-rows-${gridRowCount} scaleImage-${gridRowCount} pb-4`}
        >
            {props.words.map((word: (IReadyData)) => {
                return (
                    <WordBoardItem
                        word={word}
                        key={(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName}
                        onClick={props.onClick}
                        clicked={props.allClicked[(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName]}
                    />
                );
            })}
        </ul>
    );
}
