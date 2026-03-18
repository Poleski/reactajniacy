import { type Dispatch, type SetStateAction, useContext, useEffect, useRef, } from "react";
import { IoCloseSharp } from "react-icons/io5";
import QRCode from "react-qr-code";
import { motion } from 'motion/react';
import { messages } from "../data/messages";
import type { IModalData } from "../models/context.models";
import type { IImageReadyData, IMessages, IMessagesDetails } from "../models/data.models";
import buttonize from './a11y/buttonize';
import MainContext from "./Context";

interface IModalProps {
    data: IModalData;
    open: boolean;
    setter: Dispatch<SetStateAction<boolean>>;
}

export default function Modal(props: React.PropsWithChildren<IModalProps>) {
    const {lang, animationDelay} = useContext(MainContext);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const newMessages: IMessagesDetails = (messages as IMessages)[
        props.data.type
        ];
    const isImage = props.data.replacement && "fileName" in props.data.replacement;
    let replacement = "";
    if (props.data.replacement?.pl) {
        replacement = props.data.replacement[lang]?.toUpperCase() ?? "";
    } else if (props.data.replacement?.fileName) {
        replacement = props.data.replacement.fileName;
    }

    const modalClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleClose = () => {
        props.setter(false);
    };

    const handleAccept = () => {
        if (props.data.yesCallback) {
            props.data.yesCallback();
        }
        modalClose();
    };

    const handleDecline = () => {
        if (props.data.noCallback) {
            props.data.noCallback();
        }
        modalClose();
    };

    useEffect(() => {
        if (props.open && dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, [props.open]);

    const motionVariants = {
        active: {
            opacity: 1,
            transform: "translateY(0%)"
        },
        inactive: {
            opacity: 0,
            transform: "translateY(75%)",
            transition: {
                duration: animationDelay * 0.002
            },
        }
    }

    return (
        <motion.dialog
            variants={motionVariants}
            animate={props.open ? 'active' : 'inactive'}
            ref={dialogRef}
            onClose={handleClose}
            className={`${isImage ? "max-w-300" : "max-w-200 max-h-100"} w-full h-fit min-h-40 top-1/2 left-1/2 -translate-1/2 relative rounded-xl border-2 bg-t-light border-t-light dark:bg-t-dark center dark:border-t-light text-center p-4 dark:text-white backdrop:bg-t-dark-backdrop`}
        >
            <h2 className="font-bold text-2xl pb-2">
                {newMessages.heading[lang]}
            </h2>
            {props.data.type === "qrCode" && (
                <QRCode
                    value={window.location.href.replace("/game/", "/boss/")}
                    className="m-auto pt-2 pb-2"
                />
            )}
            {(props.data.type === "guess" || props.data.type === "bossGuess") && props.data.replacement?.fileName && (
                <>
                    <div className="inline-block rounded-xl bg-t-picture-neutral">
                        <picture>
                            <source
                                srcSet={`/pictures/${(props.data.replacement as IImageReadyData).fileName}`}/>
                            <img
                                src={`/pictures/${(props.data.replacement as IImageReadyData).fileName}`}
                                alt={(props.data.replacement as IImageReadyData).fileName}/>
                        </picture>
                    </div>
                    <p>
                        {newMessages.body[lang].replace(
                            "INJECT",
                            newMessages.picture_inject ? newMessages.picture_inject[lang] : ''
                        )}
                    </p>
                </>
            )
            }
            {
                props.data.type !== "qrCode" && !props.data.replacement?.fileName && (
                    <p>
                        {newMessages.body[lang].replace(
                            "INJECT",
                            replacement,
                        )}
                    </p>
                )
            }
            <button
                className="absolute top-1 right-1 dark:bg-t-dark p-1 text-2xl text-t-light-red cursor-pointer rounded-xl text-center transition-colors bg-t-light hover:text-black dark:hover:text-white "
                {...buttonize(handleDecline)}
            >
                <IoCloseSharp/>
            </button>
            <div className="action-buttons-container w-1/2 m-auto flex justify-around pt-6">
                <button
                    className="text-lg font-bold p-1 pl-4 pr-4 border-2 border-t-light-green rounded-xl hover:bg-t-light-green transition-colors cursor-pointer"
                    {...buttonize(handleAccept)}
                >
                    {newMessages.confirm[lang]}
                </button>
                {newMessages?.decline && (
                    <button
                        className="text-lg font-bold p-1 pl-4 pr-4 border-2 border-t-light-red rounded-xl hover:bg-t-light-red transition-colors cursor-pointer"
                        {...buttonize(handleDecline)}
                    >
                        {newMessages.decline[lang]}
                    </button>
                )}
            </div>
        </motion.dialog>
    );
}
