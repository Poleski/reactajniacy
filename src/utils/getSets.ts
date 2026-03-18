import { wordArrays } from "../data/data";
import type { IImageData } from "../models/data.models.ts";

export const getWordSet = (num: number, arrays = wordArrays): string[] => {
    const binaryMap: boolean[] = num
        .toString(2)
        .split("")
        .reverse()
        .map((i) => !!Number.parseInt(i));
    return arrays.filter((_item, index) => binaryMap[index]);
};

export const deconstructSets = (sets: number): number[] => {
    if (sets < 0) {
        return [0];
    }
    return sets
        .toString(2)
        .split("")
        .reverse()
        .map((num, i) => Number.parseInt(num) * 2 ** i)
        .filter((num) => num);
}

export const getPicturesSet = async (setName: string): Promise<IImageData[]> => {
    const splitted = setName.split('_');
    const data: IImageData[] = [];
    if (splitted.length !== 3 || Number.isNaN(+splitted[1]) || Number.isNaN(+splitted[2]) || +splitted[1] > +splitted[2]) {
        return Promise.reject(new Error('invalid picture set'));
    }
    for (let i = Number.parseInt(splitted[1]); i < Number.parseInt(splitted[2]) + 1; i++) {
        data.push({
            fileName: `${i}.webp`
        })
    }
    return new Promise((resolve) => resolve(data));
}


