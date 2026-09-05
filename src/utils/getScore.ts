import type { IGuessedData, ISchemaPlayersOnly } from "../models/data.models.ts";

const getScore = (initialScore: ISchemaPlayersOnly, guesses: IGuessedData[]) => {
    const newScore = {...initialScore};
    guesses.forEach((guess) => {
        if (Object.keys(initialScore).includes(guess.role)) {
            newScore[guess.role as keyof ISchemaPlayersOnly]--;
        }
    });
    return newScore;
}

export default getScore;