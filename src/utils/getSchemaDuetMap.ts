import type {
    ICoopKeys,
    IImageData,
    IReadyData,
    ISchema,
    ISchemaCoop,
    IWordData
} from "../models/data.models";
import { shuffleArray } from "./shuffleArray.ts";

export const getSchemaDuetMap = (
    schema: ISchemaCoop,
    seedingFn: () => number,
    fullSet: (IWordData | IImageData)[]
) => {
    const schemaMap: (keyof ISchema)[][] = [];
    const rawRoles: (keyof ISchemaCoop)[] = [
        "red_red",
        "red_neutral",
        "red_killer",
        "neutral_neutral",
        "neutral_killer",
        "killer_killer"
    ];

    rawRoles.forEach((rawRole) => {
        if (rawRole in schema) {
            for (let i: number = schema[rawRole] as number; i > 0; i--) {
                const dividedRoles = rawRole.split("_") as (ICoopKeys)[];
                schemaMap.push(dividedRoles);
                if (dividedRoles[0] !== dividedRoles[1]) {
                    const reversedRoles = [...dividedRoles].reverse();
                    schemaMap.push(reversedRoles);
                }
            }
        }
    });

    const finalSet: IReadyData[][] = [];
    let newFullSet = [...fullSet];

    while (finalSet.length < schemaMap.length) {
        const newSelection: IReadyData[] = [];
        const randomFullSetItem = newFullSet[Math.floor(seedingFn() * newFullSet.length)]

        schemaMap[0].forEach((_schemaItem, index) => {
            newSelection.push({
                ...randomFullSetItem,
                role: schemaMap[finalSet.length][index] as keyof Omit<
                    ISchema,
                    "random"
                >
            });
        })

        finalSet.push(newSelection);
        if ("fileName" in randomFullSetItem) {
            newFullSet = newFullSet.filter((imageItem) => (imageItem as IImageData).fileName !== randomFullSetItem.fileName);
        } else {
            newFullSet = newFullSet.filter((wordItem) => (wordItem as IWordData).pl !== randomFullSetItem.pl);
        }
    }

    return {
        words: shuffleArray(seedingFn, finalSet),
        schemaMap
    };
};
