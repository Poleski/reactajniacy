import type { ISchema } from "../models/data.models.ts";

export default function getMaxGuessed(schema: (keyof ISchema)[][]) {
    return schema.filter(schemaItem => schemaItem.some((role) => role === "red")).length;
}