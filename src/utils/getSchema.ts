import {
    schema_test,
    schema_normal,
    schema_pictures,
    schema_xl,
    schema_xs,
    schema_threes,
    schema_threes_skirmish,
    schema_duet_test,
    schema_duet,
    schema_duet_xs,
    schema_duet_xl,
    schema_duet_pictures,
    //schema_tercet
} from "../data/data";
import type { ISchema, ISchemaCoop } from "../models/data.models.ts";

export const getSchema = (
    type: number
): ISchema => {
    switch (type) {
        case 0:
            return schema_test;
        case 1:
            return schema_normal;
        case 2:
            return schema_pictures;
        case 3:
            return schema_xl;
        case 4:
            return schema_xs
        case 5:
            return schema_threes;
        case 6:
            return schema_threes_skirmish;
        default:
            return schema_normal;
    }
};

export const getSchemaCoop = (
    type: number
): ISchemaCoop => {
    switch (type) {
        case 0:
            return schema_duet_test
        case 1:
            return schema_duet;
        case 2:
            return schema_duet_xl;
        case 3:
            return schema_duet_xs;
        case 4:
            return schema_duet_pictures;
        // case 5:
        //     return schema_tercet;
        default:
            return schema_duet;
    }
}

