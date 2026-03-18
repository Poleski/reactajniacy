import type { languages, gameTypes, wordArrays } from '../data/data';

export interface ILoaderParams {
    type: string;
    set: string;
    seed: string;
}

export interface IWordData {
    pl: string;
    en: string;
}

export interface IWordReadyData extends IWordData {
    role: keyof Omit<ISchema, "random">;
}

export interface IImageData {
    fileName: string;
}

export interface IImageReadyData extends IImageData {
    role: keyof Omit<ISchema, "random">;
}

export type IData = IWordData | IImageData

export type IReadyData = IWordReadyData | IImageReadyData;

export interface ISchema {
    red: number;
    blue: number;
    killer?: number;
    neutral?: number;
    green?: number;
    random?: 1 | 3;
}

export interface ISchemaDuet {
    redBlue: number;
    redNeutral: number;
    redKiller: number;
    blueNeutral: number;
    blueKiller: number;
    neutral: number;
    neutralKiller: number;
    killer: number;
}

export type ISchemaPlayersOnly = Omit<ISchema, "killer" | "neutral" | "random">;

export interface IAllClicked {
    [key: string]: boolean | null;
}

export interface IMessages {
    guess: IMessagesDetails;
    bossGuess: IMessagesDetails;
    finished: IMessagesDetails;
    killerFound: IMessagesDetails;
    qrCode: IMessagesDetails;
    load: IMessagesDetails;
}

export interface IMessagesDetails {
    heading: IWordData;
    body: IWordData;
    confirm: IWordData;
    decline?: IWordData;
    picture_inject?: IWordData;
}

export type IFormLabelsTypes = {
    [key in typeof gameTypes[number]]: string;
} & {
    topLabel: string;
};

export type IFormLabelsSets = {
    [key in typeof wordArrays[number]]: string;
} & {
    topLabel: string;
}

export interface ILabels {
    seed: {
        [key in typeof languages[number]]: string;
    },
    types: {
        [key in typeof languages[number]]: IFormLabelsTypes
    },
    sets: {
        [key in typeof languages[number]]: IFormLabelsSets
    },
    submit: {
        [key in typeof languages[number]]: string;
    }
}

export type IDefaultSets = {
   [index in keyof IFormLabelsTypes]?: keyof IFormLabelsSets
}
