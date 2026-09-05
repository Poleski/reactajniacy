import type { IReadyData, ISchema } from "../models/data.models.ts";

interface IDataCoop {
    words: IReadyData[][],
    schemaMap: (keyof ISchema)[][]
}
const getPlayerWords = (data: IDataCoop, activePlayer = 0) => {
    return data.words.map(word => word[activePlayer]);
}

export default getPlayerWords;
