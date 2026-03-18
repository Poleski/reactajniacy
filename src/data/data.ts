import type { IDefaultSets, ISchema, ISchemaDuet, } from "../models/data.models";

export const languages = ['pl', 'en'] as const;
export const wordArrays = [
    "base",
    "halloween",
    "xmas",
    "inside",
    "pictures_0_279" // comment this out in case of copyright infringement
];

export const gameTypes = ["normal", "pictures", "xl", "xs", "threes", "threes_skirmish"] as const;

export const defaultGameSets: IDefaultSets = {
    normal: "base",
    pictures: "pictures_0_279",
    xl: "base",
    xs: "base",
    threes: "base",
    threes_skirmish: "base"
}

// for unit tests only
export const schema_test: ISchema = {
    red: 1,
    blue: 1,
    killer: 1,
    random: 1
}

export const schema_normal: ISchema = {
    killer: 1,
    neutral: 7,
    red: 8,
    blue: 8,
    random: 1,
};

export const schema_pictures: ISchema = {
    killer: 1,
    neutral: 4,
    red: 7,
    blue: 7,
    random: 1,
};

export const schema_xl: ISchema = {
    killer: 1,
    neutral: 10,
    red: 12,
    blue: 12,
    random: 1,
};

export const schema_xs: ISchema = {
    killer: 0,
    neutral: 5,
    red: 5,
    blue: 5,
    random: 1,
};

export const schema_duet: ISchemaDuet = {
    redBlue: 3,
    redNeutral: 5,
    redKiller: 1,
    blueNeutral: 5,
    blueKiller: 1,
    neutral: 7,
    neutralKiller: 1,
    killer: 2,
};

export const schema_threes: ISchema = {
    killer: 1,
    neutral: 5,
    red: 7,
    blue: 7,
    green: 7,
    random: 3,
};

export const schema_threes_skirmish: ISchema = {
    killer: 0,
    neutral: 0,
    red: 11,
    blue: 11,
    green: 11,
    random: 3,
};
