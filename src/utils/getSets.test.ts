import { describe, expect, it } from 'vitest';
import { deconstructSets, getWordSet, getPicturesSet } from './getSets';

describe('test getWordSet function', () => {
    it('should return correct sets', () => {
        const testWordArrays = ['base', 'halloween', 'xmas', 'inside'];

        const test1 = getWordSet(1, testWordArrays);
        expect(test1).toEqual(['base']);

        const test2 = getWordSet(6, testWordArrays);
        expect(test2).toEqual(['halloween', 'xmas']);

        const test3 = getWordSet(8, testWordArrays);
        expect(test3).toEqual(['inside']);
    })

});

describe('test deconstructSets function', () => {
    it('should return correct deconstructed sets', () => {
        const test1 = deconstructSets(1);
        expect(test1).toEqual([1]);

        const test2 = deconstructSets(7);
        expect(test2).toEqual([1,2,4]);

        const test3 = deconstructSets(21);
        expect(test3).toEqual([1,4,16]);

        const test4 = deconstructSets(-1);
        expect(test4).toEqual([0]);
    });
})

describe('test getPicturesSet function', async () => {
    it ('should return promise resolving to correct picture set', async () => {
        const testPictureSet1 = await getPicturesSet('pictures_1_5');
        expect(testPictureSet1).toHaveLength(5);
        expect(testPictureSet1[0].fileName).toBeDefined();

        const testPictureSet2 = await getPicturesSet('pictures_249_265');
        expect(testPictureSet2).toHaveLength(17);
        expect(testPictureSet2[0].fileName).toBeDefined();
    })

    it('should throw an error with incorrect picture set', async () => {
        const testPictureSet1 = getPicturesSet('pictures_5_4');
        await expect(testPictureSet1).rejects.toThrowError();

        const testPictureSet2 = getPicturesSet('pictures_test_test');
        await expect(testPictureSet2).rejects.toThrowError();

        const testPictureSet3 = getPicturesSet('pictures_1_5_10');
        await expect(testPictureSet3).rejects.toThrowError();

        const testPictureSet4 = getPicturesSet('pictures_1-5');
        await expect(testPictureSet4).rejects.toThrowError();
    })
});
