import type { languages, gameTypes, wordArrays, gameTypesCoop } from '../data/data';

export interface ILoaderParams {
    type: string;
    set: string;
    seed: string;
    coop: boolean;
}

export interface IWordData {
    pl: string;
    en: string;
}

export interface IImageData {
    fileName: string;
}

export type IReadyData = (IWordData | IImageData) & {
    role: keyof Omit<ISchema, "random">;
};

export type IGuessedData = IReadyData & {
    guessedBy: number;
}

export interface ISchema {
    red: number;
    blue?: number;
    killer?: number;
    neutral?: number;
    green?: number;
    random?: 1 | 3;
}

export type ICoopKeys = keyof Omit<ISchema, "green" | "blue" | "random">;
export type ISchemaCoop = {
    [key in `${ICoopKeys}_${ICoopKeys}`]?: number;
}
// export type ISchemaCoop = {
//     [key in `${ICoopKeys}_${ICoopKeys}`]?: number;
// } | {
//     [key in `${ICoopKeys}_${ICoopKeys}_${ICoopKeys}`]?: number;
// };
export type ISchemaPlayersOnly = Omit<ISchema, "killer" | "neutral" | "random">;

export interface IAllClicked {
    [key: string]: boolean | null;
}

export interface IMessages {
    guess: IMessagesDetails;
    bossGuess: IMessagesDetails;
    finished: IMessagesDetails;
    killerFound: IMessagesDetails;
    finishedCoop: IMessagesDetails;
    killerFoundCoop: IMessagesDetails;
    qrCode: IMessagesDetails;
    load: IMessagesDetails;
}

export interface IMessagesDetails {
    heading: IWordData;
    body: IWordData;
    confirm: IWordData;
    decline?: IWordData;
    picture_inject?: IWordData;
    score?: IWordData;
}

export type IFormLabelsTypes = {
    [key in typeof gameTypes[number]]: string;
} & {
    [key in typeof gameTypesCoop[number]]: string;
} & {
    topLabel: string;
    coopLabel: string;
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

export type IDataNormal = {
    words: IReadyData[],
    schemaMap: (keyof ISchema)[]
}

export type IDataCoop = {
    words: IReadyData[][],
    schemaMap: (keyof ISchema)[][]
}

export type IData = IDataNormal | IDataCoop

export interface IFinishGameCoopProps {
    guessed: number,
    maxGuessed: number,
    changeCount: number,
}
