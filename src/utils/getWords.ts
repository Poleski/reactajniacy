import seedrandom from "seedrandom";
import type { IImageData, ILoaderParams, IWordData } from "../models/data.models";
import { getSchema, getSchemaCoop } from "./getSchema";
import { getSchemaMap } from "./getSchemaMap";
import { getPicturesSet, getWordSet } from "./getSets";
import { getSchemaDuetMap } from "./getSchemaDuetMap.ts";

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

    const fullSet: (IWordData | IImageData)[] = await Promise.all(wordPromises).then((values) => {
        let tempSet: IWordData[] = [];
        values.forEach((value) => {
            const newValue = (value as ImportedWordData).default ?? value;
            tempSet = [...tempSet, ...newValue];
        });
        return tempSet;
    });

    const rng: () => number = seedrandom(params.seed);

    if (params.coop) {
        return getSchemaDuetMap(getSchemaCoop(Number.parseInt(params.type)), rng, fullSet);
    }
    return getSchemaMap(getSchema(Number.parseInt(params.type)), rng, fullSet);
}
