import {
    schema_test,
    schema_normal,
    schema_pictures,
    schema_xl,
    schema_xs,
    schema_threes,
    schema_threes_skirmish
} from "../data/data";
import type { ISchema } from "../models/data.models.ts";

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
