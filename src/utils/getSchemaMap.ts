import type { IImageData, IReadyData, ISchema, IWordData } from "../models/data.models";
import { shuffleArray } from "./shuffleArray.ts";

export const getSchemaMap = (
    schema: ISchema,
    seedingFn: () => number,
    fullSet: (IWordData | IImageData)[]
) => {
    const schemaMap: Array<keyof ISchema> = [];
    const roles: Array<keyof ISchema> = [
        "killer",
        "neutral",
        "red",
        "blue",
        "green",
    ];

    roles.forEach((role) => {
        if (schema[role]) {
            for (let i: number = schema[role] as number; i > 0; i--) {
                schemaMap.push(role);
            }
        }
    });

    const playableRoles: Array<keyof ISchema> = ["red", "blue"];
    if (schemaMap.filter((role) => role === "green").length > 0) {
        playableRoles.push("green");
    }

    if (schema.random && schema.random > 0) {
        if (schema.random === 1) {
            schemaMap.push(
                playableRoles[Math.floor(seedingFn() * playableRoles.length)],
            );
        } else if (schema.random === 3) {
            const randomFirstPlayer = Math.floor(seedingFn() * playableRoles.length);
            schemaMap.push(playableRoles[randomFirstPlayer]);
            schemaMap.push(playableRoles[randomFirstPlayer]);

            if (randomFirstPlayer === playableRoles.length - 1) {
                schemaMap.push(playableRoles[0])
            } else {
                schemaMap.push(playableRoles[randomFirstPlayer + 1]);
            }
        }
    }

    const finalSet: IReadyData[] = [];
    let newFullSet = [...fullSet];

    while (finalSet.length < schemaMap.length) {
        const newSelection: IReadyData = {
            ...newFullSet[Math.floor(seedingFn() * newFullSet.length)],
            role: schemaMap[finalSet.length] as keyof Omit<
                ISchema,
                "random"
            >
        };

        finalSet.push(newSelection);
        if ("fileName" in newSelection) {
            newFullSet = newFullSet.filter((imageItem) => (imageItem as IImageData).fileName !== newSelection.fileName);
        } else {
            newFullSet = newFullSet.filter((wordItem) => (wordItem as IWordData).pl !== newSelection.pl);
        }
    }

    return {
        words: shuffleArray(seedingFn, finalSet),
        schemaMap
    };
};
