import { describe, it, expect } from 'vitest';
import seedrandom from "seedrandom";
import { shuffleArray } from './shuffleArray';

describe('testing shuffleArray function', () => {
    const testArray = [1,2,3,4,5,6,7,8,9,0];
    const testSeedRandom: () => number = seedrandom('test');
    const newArray = shuffleArray(testSeedRandom, [...testArray]);

    it("should have the same length for input and output", () => {
        expect(testArray.length).toBe(newArray.length);
    });

    it("should return different output than input", () => {
        expect(testArray.toString()).not.toEqual(newArray.toString())
    });

    it("should have the same output values present within input", () => {
        testArray.forEach(testItem => {
            expect(newArray).toContain(testItem);
        });
    });
})