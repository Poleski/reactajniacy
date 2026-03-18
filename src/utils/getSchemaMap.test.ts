import { describe, expect, it } from 'vitest';
import type { ISchema } from "../models/data.models";
import { getSchemaMap } from "./getSchemaMap";

describe('test getSchemaMap function ', () => {
    it("should return correct schema map for basic data", () => {
        const testSchema: ISchema = {red: 2, blue: 2, neutral: 2, killer: 1, random: 1}
        const testSeedingFunction = () => 0.7;

        const testSchemaMap = getSchemaMap(testSchema, testSeedingFunction)

        expect(testSchemaMap).toHaveLength(8);
        expect(testSchemaMap.filter(item => item === 'red')).toHaveLength(2);
        expect(testSchemaMap.filter(item => item === 'blue')).toHaveLength(3);
    })

    it("should return correct schema map for advanced data", () => {
        const testSchema: ISchema = {red: 2, blue: 2, green: 2, killer: 1, random: 3}
        const testSeedingFunction = () => 0.3;

        const testSchemaMap = getSchemaMap(testSchema, testSeedingFunction)

        expect(testSchemaMap.filter(item => item === 'red')).toHaveLength(4);
        expect(testSchemaMap.filter(item => item === 'blue')).toHaveLength(3);
        expect(testSchemaMap.filter(item => item === 'green')).toHaveLength(2);
    })
});
