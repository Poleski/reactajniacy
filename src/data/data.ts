import type { IDefaultSets, ISchema, ISchemaCoop, } from "../models/data.models";

export const languages = ['pl', 'en'] as const;
export const wordArrays = [
    "base",
    "halloween",
    "xmas",
    "inside",
    "pictures_0_279" // comment this out in case of copyright infringement
];

export const gameTypes = ["normal", "pictures", "xl", "xs", "threes", "threes_skirmish"] as const;

export const gameTypesCoop = ["duet", "duet_xl", "duet_xs", "duet_pictures"/*, "tercet"*/] as const;

export const defaultGameSets: IDefaultSets = {
    normal: "base",
    pictures: "pictures_0_279",
    xl: "base",
    xs: "base",
    threes: "base",
    threes_skirmish: "base",
    duet: "base",
    duet_xl: "base",
    duet_xs: "base",
    duet_pictures: "pictures_0_279",
    //tercet: "base",
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

export const schema_duet_test: ISchemaCoop = {
    red_red: 1,
    red_neutral: 1, // x2
    red_killer: 1, // x2
    neutral_neutral: 1,
    neutral_killer: 1, // x2
    killer_killer: 1
}

export const schema_duet: ISchemaCoop = {
    red_red: 3,
    red_neutral: 5, // x2
    red_killer: 1, // x2
    neutral_neutral: 7,
    neutral_killer: 1, // x2
    killer_killer: 1
};

export const schema_duet_xl: ISchemaCoop = {
    red_red: 5,
    red_neutral: 7, // x2
    red_killer: 2, // x2
    neutral_neutral: 10,
    neutral_killer: 1, // x2
    killer_killer: 1
}

export const schema_duet_xs: ISchemaCoop = {
    red_red: 2,
    red_neutral: 3, // x2
    red_killer: 1, // x2
    neutral_neutral: 4,
    neutral_killer: 1, // x2
    killer_killer: 0
}

export const schema_duet_pictures: ISchemaCoop = {
    red_red: 3,
    red_neutral: 4, // x2
    red_killer: 1, // x2
    neutral_neutral: 4,
    neutral_killer: 1, // x2
    killer_killer: 1
}

// export const schema_tercet: ISchemaCoop = {
//     red_red_red: 1,
//     red_red_neutral: 3, // x2
//     red_neutral_red: 3, // equal ^
//     red_neutral_neutral: 3, // x2
//     neutral_red_neutral: 3, // equal ^
//     red_red_killer: 1, // x2,
//     red_killer_red: 1, // equal ^
//     neutral_neutral_neutral: 10,
//     neutral_neutral_killer: 1, // x2
//     neutral_killer_neutral: 1, // equal ^
//     killer_killer_killer: 1
// };

// normal has 1 killer, duet has 5 killers total (3 each), so tercet should have 7 (5 each): 1 triple, 1 neutral-killer for each pair, 1 red-killer for each pair
// therefore:
// killer_killer_killer: 1,
// neutral_neutral_killer: 1
// neutral_killer_neutral: 1
// red_red_killer: 1,
// red_killer_red: 1,
// TOTAL: 7

// normal has 9/8 to guess, coop has 9 to guess, so tercet should have 9 as well
// coop has 3 doubles + 5 neutrals and 1 killer each for 13 cards in total, which is above 50% of board
// tercet should have at least 18 cards in total, therefore
// red_red_red: 1
// red_red_neutral: 3
// red_neutral_red: 3
// red_neutral_neutral: 3,
// neutral_red_neutral: 3,
// TOTAL: 19
// TOTAL WITH KILLERS: 26

// normal has 7 neutrals, duet also has 7 double neutrals. therefore, 9 neutrals should be fine so:
// neutral_neutral_neutral: 10

// this means each player has to guess: 2 + 1 + 3 + 3 + 3 = 12
// max number of correct is therefore: 3 + 1 + 9 + 9 = 22

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
