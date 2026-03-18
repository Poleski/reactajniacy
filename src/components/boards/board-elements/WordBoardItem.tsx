import { type Dispatch, type SetStateAction, useContext, useEffect, useState, } from "react";
import { useLocation } from "react-router";
import { motion } from 'motion/react';
import type { IImageReadyData, IReadyData, IWordReadyData } from "../../../models/data.models.ts";
import MainContext from "../../Context";
import buttonize from "../../a11y/buttonize.ts";

interface IWordBoardItemProps {
    word: IReadyData;
    clicked: boolean | null;
    onClick: (
        word: IReadyData,
        setter?: Dispatch<SetStateAction<string>>,
    ) => void;
}
export default function WordBoardItem(props: React.PropsWithChildren<IWordBoardItemProps>) {
    const {lang, size, animationDelay} = useContext(MainContext);
    const [itemClass, setItemClass] = useState<string>("");
    const [tempClass, setTempClass] = useState<string>("");
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/");
    const isImage = "fileName" in props.word;

    const handleClick = () => {
        if (isBoss) {
            props.onClick(props.word);
            return;
        }

        if (!props.clicked && props.clicked !== null) {
            setTempClass(
                "red:border-t-light-red blue:border-t-light-blue green:border-t-light-green",
            );
            props.onClick(props.word, setTempClass);
        }
    };

    useEffect(() => {
        // clicked item and regular item in the boss view
        if ((props.clicked && !isBoss) || (!props.clicked && isBoss)) {
            if (props.word.role === "red") {
                setItemClass("clicked bg-t-light-red text-white border-black");
            } else if (props.word.role === "blue") {
                setItemClass("clicked bg-t-light-blue text-white border-black");
            } else if (props.word.role === "green") {
                setItemClass("clicked bg-t-light-green text-white border-black");
            } else if (props.word.role === "killer") {
                setItemClass(
                    "clicked bg-t-light-killer dark:bg-t-dark-killer text-white border-black picture:bg-t-light picture:invert border-t-light dark:border-t-dark",
                );
            } else {
                setItemClass("clicked bg-t-light-neutral text-black");
            }
            // on hover when not in boss view
        } else if (props.clicked === false && !isBoss) {
            setItemClass(
                "hover:red:border-t-light-red hover:blue:border-t-light-blue hover:green:border-t-light-green picture:bg-t-picture-neutral",
            );
            // minor changes for boss grid view
        } else if (isBoss) {
            setItemClass("border-t-disabled text-t-disabled");
            // game is finished
        } else {
            if (props.word.role === "red") {
                setItemClass("border-t-light-red");
            } else if (props.word.role === "blue") {
                setItemClass("border-t-light-blue");
            } else if (props.word.role === "green") {
                setItemClass("border-t-light-green");
            } else if (props.word.role === "killer") {
                setItemClass("border-t-light-killer");
            } else {
                setItemClass("border-t-light-neutral");
            }
        }
    }, [props.clicked, props.word.role, isBoss]);

    const motionVariants = {
        active: {
            rotateY: [0, "90deg", 0],
            transition: {
                duration: animationDelay * 0.002,
                times: [0, 0.5, 1]
            }
        },
        inactive: {
            rotateY: 0,
        }
    }

    return (
        <motion.li className={`${isImage && "picture"}`} variants={motionVariants}
                   animate={props.clicked ? 'active' : 'inactive'}>
            <button
                {...buttonize(handleClick)}
                className={`w-full uppercase transition-colors font-black text-center rounded-xl border-2 ${!props.clicked && props.clicked !== null ? "cursor-pointer" : ""} ${size === "large" && !isBoss ? "text-4xl" : ""} ${size === "normal" && !isBoss ? "text-3xl" : ""} ${size === "small" && !isBoss ? "text-2xl" : ""} ${isBoss ? "text-xs py-4 px-1 break-all" : isImage ? "p-0" : "py-8 px-1"} ${itemClass} ${tempClass}`}
                style={{transition: props.clicked ? `background ${animationDelay}ms ease ${animationDelay}ms, color ${animationDelay}ms ease ${animationDelay}ms, border ${animationDelay}ms ease ${animationDelay}ms, filter ${animationDelay}ms ease ${animationDelay}ms` : 'none'}}
            >
                {!isImage && (
                    <p>{(props.word as IWordReadyData)[lang]}</p>
                )}
                {isImage && (
                    <picture className="inline-block">
                        <source src={`/pictures/${(props.word as IImageReadyData).fileName}`}/>
                        <img src={`/pictures/${(props.word as IImageReadyData).fileName}`}
                             className="scaleImage-4:max-h-[19vh] scaleImage-5:max-h-[14vh] scaleImage-6:max-h-[11vh]" alt={(props.word as IImageReadyData).fileName}/>
                    </picture>
                )}
            </button>
        </motion.li>
    );
}