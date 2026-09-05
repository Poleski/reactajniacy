import type { IAllClicked, IGuessedData } from "../models/data.models.ts";

const getAllClicked = (guesses: IGuessedData[]): IAllClicked => {
    return guesses.reduce((acc: IAllClicked, guess) => {
        if ("pl" in guess) {
            acc[guess.pl] = true;
        } else {
            acc[guess.fileName] = true;
        }
        return acc;
    }, {})
}

export default getAllClicked;
