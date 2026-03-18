import { describe, expect, it } from 'vitest';
import { getWords } from './getWords';
import type { IImageReadyData, ILoaderParams, IWordReadyData } from "../models/data.models.ts";
import json from "../data/words/test.json";

describe('test getWords function for words', () => {
    it('should import correct word set', async () => {
        const testLoaderData: ILoaderParams = {
            type: '0',
            set: '0',
            seed: 'test'
        };

        const testGetWords = await getWords(testLoaderData, ['test']);

        expect(testGetWords.words.map(item => {
            return {
                "pl": (item as IWordReadyData).pl,
                "en": (item as IWordReadyData).en
            }
        })).toEqual(json);
    })
});

describe('test getWords function for pictures', () => {
    it('should import correct word set', async () => {
        const testLoaderData: ILoaderParams = {
            type: '0',
            set: '0',
            seed: 'test'
        };

        const testGetWords = await getWords(testLoaderData, ['pictures_1_10']);

        expect(testGetWords.words).toHaveLength(4);

        testGetWords.words.forEach(item => {
            expect((item as IImageReadyData).fileName).toBeDefined();
            expect((item as IImageReadyData).fileName).toContain('.webp');
            expect((item as IImageReadyData).role).toBeTypeOf('string')
        })
    })
});