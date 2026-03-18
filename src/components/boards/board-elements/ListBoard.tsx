import { useContext } from "react";
import type { IAllClicked, IImageReadyData, IReadyData, IWordReadyData } from "../../../models/data.models.ts";
import MainContext from "../../Context";
import ListBoardItem from "./ListBoardItem.tsx";

interface IListBoardProps {
    words: IReadyData[];
    allClicked: IAllClicked;
    onClick: (word: IReadyData) => void;
    bossView: ("grid" | "list" | "both")
}

interface ISortedWords {
    red?: IReadyData[];
    blue?: IReadyData[];
    green?: IReadyData[];
    killer?: IReadyData[];
    neutral?: IReadyData[];
}

export default function ListBoard(
    props: React.PropsWithChildren<IListBoardProps>,
) {
    const {lang} = useContext(MainContext);
    const sortedWords: ISortedWords = {};
    for (const word of props.words) {
        if (typeof sortedWords[word.role] === "undefined") {
            sortedWords[word.role] = [];
        }
        sortedWords[word.role]?.push(word);
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

    const handleClick = (word: IReadyData) => {
        props.onClick(word);
    };

    return (
        <div className={`flex justify-center ${props.bossView === "both" ? "" : "text-lg flex-wrap"}`}>
            {sortedWords?.red && sortedWords.red.length > 0 && (
                <ul className="px-4 pb-2 flex flex-col flex-wrap basis-0.4">
                    {sortedWords.red.map((word) => {
                        return (
                            <ListBoardItem
                                word={word}
                                key={(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName}
                                onClick={handleClick}
                                clicked={props.allClicked[(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName]}
                            />
                        );
                    })}
                </ul>
            )}
            {sortedWords?.blue && sortedWords.blue.length > 0 && (
                <ul className="px-4 pb-2 flex flex-col flex-wrap basis-0.4">
                    {sortedWords.blue.map((word) => {
                        return (
                            <ListBoardItem
                                word={word}
                                key={(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName}
                                onClick={handleClick}
                                clicked={props.allClicked[(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName]}
                            />
                        );
                    })}
                </ul>
            )}
            {sortedWords?.green && sortedWords.green.length > 0 && (
                <ul className="px-4 pb-2 flex flex-col flex-wrap basis-0.4">
                    {sortedWords.green.map((word) => {
                        return (
                            <ListBoardItem
                                word={word}
                                key={(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName}
                                onClick={handleClick}
                                clicked={props.allClicked[(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName]}
                            />
                        );
                    })}
                </ul>
            )}
            {(sortedWords?.killer || sortedWords?.neutral) && (
                <ul className="px-4 pb-2 flex flex-col flex-wrap basis-0.4">
                    {sortedWords?.killer &&
                        sortedWords.killer.length > 0 &&
                        sortedWords.killer.map((word) => {
                            return (
                                <ListBoardItem
                                    word={word}
                                    key={(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName}
                                    onClick={handleClick}
                                    clicked={props.allClicked[(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName]}
                                />
                            );
                        })}
                    {sortedWords?.neutral &&
                        sortedWords.neutral.length > 0 &&
                        sortedWords.neutral.map((word) => {
                            return (
                                <ListBoardItem
                                    word={word}
                                    key={(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName}
                                    onClick={handleClick}
                                    clicked={props.allClicked[(word as IWordReadyData).pl ?? (word as IImageReadyData).fileName]}
                                />
                            );
                        })}
                </ul>
            )}
        </div>
    );
}

