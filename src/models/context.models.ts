import type { IMessages } from "./data.models";

export interface IContext {
    theme: "light" | "dark" | "halloween" | "xmas";
    lang: "pl" | "en";
    size: "normal" | "small" | "large";
    bossView: "grid" | "list" | "both";
    animationDelay: number,
    openModal: (data: IModalData) => void;
}

export interface IContextOptions {
    theme: IContext["theme"][];
    lang: IContext["lang"][];
    size: IContext["size"][];
    bossView: IContext["bossView"][];
}

export interface IModalData {
    type: IModalType;
    yesCallback?: () => void;
    noCallback?: () => void;
    replacement?: {
        pl?: string;
        en?: string;
        fileName?: string;
    };
}

type IModalType = keyof IMessages;
