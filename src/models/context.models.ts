import type { IMessages, ISchemaPlayersOnly, IFinishGameCoopProps } from "./data.models";
import type { Dispatch, SetStateAction } from "react";

export interface IContextTogglables {
    theme: "light" | "dark" | "halloween" | "xmas";
    lang: "pl" | "en";
    size: "normal" | "small" | "large";
    bossView: "grid" | "list" | "both";
}

export interface IContext extends IContextTogglables {
    animationDelay: number,
    openModal: (data: IModalData) => void;
}

export type IContextOptions = {
    [K in keyof IContextTogglables]: IContextTogglables[K][];
};

export type ICoopForModal = Array<keyof ISchemaPlayersOnly> | false;

export interface IModalData {
    type: IModalType;
    yesCallback?: () => void;
    noCallback?: () => void;
    replacement?: {
        pl?: string;
        en?: string;
        fileName?: string;
    };
    coopProps?: IFinishGameCoopProps
}

export interface IOutletContext {
    setCoop: Dispatch<SetStateAction<ICoopForModal>>,
    setBgColor: Dispatch<SetStateAction<string>>
}

type IModalType = keyof IMessages;
