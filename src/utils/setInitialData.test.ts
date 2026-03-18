import { describe, expect, it } from 'vitest';
import type { IImageReadyData, ISchema, IWordReadyData } from '../models/data.models';
import setInitialData from './setInitialData';

describe("test setInitialDate", () => {
    it("should return correct data for basic input", () => {
        const testBasicWordData: IWordReadyData[] = [
            {
                role: 'red',
                pl: 'A-pl',
                en: 'A-en'
            },
            {
                role: 'red',
                pl: 'B-pl',
                en: 'B-en'
            },
            {
                role: 'blue',
                pl: 'C-pl',
                en: 'C-en'
            },
            {
                role: 'blue',
                pl: 'D-pl',
                en: 'D-en'
            },
            {
                role: 'neutral',
                pl: 'E-pl',
                en: 'E-en'
            },
            {
                role: 'neutral',
                pl: 'F-pl',
                en: 'F-en'
            },
            {
                role: 'killer',
                pl: 'G-pl',
                en: 'G-en'
            },
            {
                role: 'blue',
                pl: 'H-pl',
                en: 'H-en'
            },
        ]
        const testBasicSchemaMap: (keyof ISchema)[] = [
            'red',
            'red',
            'blue',
            'blue',
            'neutral',
            'neutral',
            'killer',
            'blue'
        ];

        const testBasicInitialData = setInitialData({
            words: testBasicWordData,
            schemaMap: testBasicSchemaMap
        });
        const clickedKeys = testBasicWordData.map(data => data.pl);

        expect(testBasicInitialData.initialScore).toEqual({
            red: 2,
            blue: 3
        });
        expect(testBasicInitialData.initialPlayer).toBe(1);
        expect(Object.keys(testBasicInitialData.initialClicked)).toHaveLength(testBasicWordData.length);
        Array.from(Object.keys(testBasicInitialData.initialClicked)).forEach(key => {
            expect(clickedKeys).toContain(key);
            expect(testBasicInitialData.initialClicked[key]).toBe(false);
        });
        expect(testBasicInitialData.initialGuesses).toHaveLength(2);
        expect(testBasicInitialData.initialGuesses.flat(1)).toHaveLength(0);
    });

    it("should return correct data for complex input", () => {
        const testAdvancedWordData: IImageReadyData[] = [
            {
                role: 'red',
                fileName: '1.webp'
            },
            {
                role: 'red',
                fileName: '2.webp'
            },
            {
                role: 'red',
                fileName: '3.webp'
            },
            {
                role: 'red',
                fileName: '4.webp'
            },
            {
                role: 'blue',
                fileName: '5.webp'
            },
            {
                role: 'blue',
                fileName: '6.webp'
            },
            {
                role: 'blue',
                fileName: '7.webp'
            },
            {
                role: 'green',
                fileName: '8.webp'
            },
            {
                role: 'green',
                fileName: '9.webp'
            },
        ];
        const testAdvancedSchemaMap: (keyof ISchema)[] = [
            'red',
            'red',
            'red',
            'red',
            'blue',
            'blue',
            'blue',
            'green',
            'green',
        ];

        const testAdvancedInitialData = setInitialData({
            words: testAdvancedWordData,
            schemaMap: testAdvancedSchemaMap
        });
        const clickedKeys = testAdvancedWordData.map(data => data.fileName);

        expect(testAdvancedInitialData.initialScore).toEqual({
            red: 4,
            blue: 3,
            green: 2
        });
        expect(testAdvancedInitialData.initialPlayer).toBe(0);
        expect(Object.keys(testAdvancedInitialData.initialClicked)).toHaveLength(testAdvancedWordData.length);
        Array.from(Object.keys(testAdvancedInitialData.initialClicked)).forEach(key => {
            expect(clickedKeys).toContain(key);
            expect(testAdvancedInitialData.initialClicked[key]).toBe(false);
        });
        expect(testAdvancedInitialData.initialGuesses).toHaveLength(3);
        expect(testAdvancedInitialData.initialGuesses.flat(3)).toHaveLength(0);
    })
})
