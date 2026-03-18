import seedrandom from "seedrandom";
import type { IImageData, ILoaderParams, IReadyData, ISchema, IWordData } from "../models/data.models";
import { getSchema } from "./getSchema";
import { getSchemaMap } from "./getSchemaMap";
import { getPicturesSet, getWordSet } from "./getSets";
import { shuffleArray } from "./shuffleArray";

interface ImportedWordData {
    default: IWordData[]
}

export async function getWords(params: ILoaderParams, set?: string[]) {
    const wordSet = set || getWordSet(Number.parseInt(params.set));
    const wordPromises: Promise<IImageData[] | ImportedWordData>[] = [];

    wordSet.forEach((set) => {
        let newPromise: Promise<IImageData[] | ImportedWordData>;
        if (set.includes('pictures')) {
            newPromise = getPicturesSet(set);
        } else {
            newPromise = import(`../data/words/${set}.json`);
            //newPromise = import('../data/words/test.json'); // replacement for copyright reasons if needed
        }
        wordPromises.push(newPromise);
    });

    let fullSet: (IWordData | IImageData)[] = await Promise.all(wordPromises).then((values) => {
        let tempSet: IWordData[] = [];
        values.forEach((value) => {
            const newValue = (value as ImportedWordData).default ?? value;
            tempSet = [...tempSet, ...newValue];
        });
        return tempSet;
    });

    const finalSet: IReadyData[] = [];
    const rng: () => number = seedrandom(params.seed);

    const schema = getSchema(Number.parseInt(params.type));
    const schemaMap = getSchemaMap(schema, rng);

    while (finalSet.length < schemaMap.length) {
        const newSelection: IReadyData = {
            ...fullSet[Math.floor(rng() * fullSet.length)],
            role: schemaMap[finalSet.length] as keyof Omit<
                ISchema,
                "random"
            >
        };

        finalSet.push(newSelection);
        if ("fileName" in newSelection) {
            fullSet = fullSet.filter((imageItem) => (imageItem as IImageData).fileName !== newSelection.fileName);
        } else {
            fullSet = fullSet.filter((wordItem) => (wordItem as IWordData).pl !== newSelection.pl);
        }
    }

    return {
        words: shuffleArray(rng, finalSet),
        schemaMap,
    };
}
