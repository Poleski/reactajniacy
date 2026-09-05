import { useContext, useEffect, useState } from "react";
import type { IImageData, IReadyData, IWordData } from "../../../models/data.models.ts";
import buttonize from "../../a11y/buttonize.ts";
import MainContext from "../../Context";

interface IListBoardItemProps {
    word: IReadyData;
    clicked: boolean | null;
    onClick: (word: IReadyData) => void;
}
export default function ListBoardItem(props: React.PropsWithChildren<IListBoardItemProps>) {
    const { lang, openModal} = useContext(MainContext);
    const [listItemClass, setListItemClass] = useState<string>("");
    const isImage = "fileName" in props.word;

    const handleClick = () => {
        if (isImage) {
            const type = "bossGuess";
            const replacement = props.word;
            const yesCallback = () => {
                props.onClick(props.word)
            }

            openModal({type, replacement, yesCallback})
        } else {
            props.onClick(props.word);
        }
    };

    useEffect(() => {
        if (props.clicked) {
            setListItemClass("text-t-disabled picture:bg-t-picture-neutral rounded-xl");
        } else {
            if (props.word.role === "red") {
                setListItemClass("text-t-light-red picture:bg-t-light-red rounded-xl coop:text-t-light-coop picture:coop:bg-t-light-coop");
            } else if (props.word.role === "blue") {
                setListItemClass("text-t-light-blue picture:bg-t-light-blue rounded-xl");
            } else if (props.word.role === "green") {
                setListItemClass("text-t-light-green picture:bg-t-light-green rounded-xl");
            } else if (props.word.role === "killer") {
                setListItemClass(
                    "text-t-light-killer dark:text-t-dark-killer dark:text-shadow-t-light picture:border-2 picture:bg-t-light picture:invert border-t-light dark:border-t-dark  rounded-xl",
                );
            } else {
                setListItemClass(
                    "text-t-light-neutral text-shadow-t-dark dark:text-shadow-none picture:bg-t-light-neutral rounded-xl",
                );
            }
        }
    }, [props.clicked]);

    return (
        <li className={`${isImage ? "picture" : ""}`}>
            <button
                className={`uppercase font-black text-center ${listItemClass} ${isImage ? "max-w-[20vw]" : ""}`}
                {...buttonize(handleClick)}
            >
                {!isImage && (
                    <p>{(props.word as IWordData)[lang]}</p>
                )}
                {isImage && (
                    <picture>
                        <source srcSet={`/pictures/${(props.word as IImageData).fileName}`}/>
                        <img src={`/pictures/${(props.word as IImageData).fileName}`}
                             alt={(props.word as IImageData).fileName}/>
                    </picture>
                )}
            </button>
        </li>
    );
}
