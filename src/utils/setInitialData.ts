import type {
    IGuessedData,
    ISchema,
    ISchemaPlayersOnly,
} from "../models/data.models";
import seedrandom from "seedrandom";

const roles: Array<keyof ISchemaPlayersOnly> = ["red", "blue", "green"];

export default function setInitialData(
    schemaMap: (keyof ISchema)[] |(keyof ISchema)[][],
    coop: boolean,
    seed = 'error',
) {
    if (seed === "error") {
        console.error('invalid seed!!!');
    }
    const initialScore: ISchemaPlayersOnly = {red: 0};
    const initialGuesses: IGuessedData[] = [];

    if (!coop) {
        roles.forEach((role) => {
            const count = schemaMap.filter(
                (currentRole) => currentRole === role,
            ).length;
            if (count > 0) {
                initialScore[role] = count;
            }
        });
    }

    let initialPlayer: number;

    if (coop && Array.isArray(schemaMap[0])) {
        const rng: () => number = seedrandom(seed);
        initialPlayer = Math.floor(rng() * schemaMap[0].length)
    } else {
        initialPlayer = Object.values(initialScore).indexOf(
            Math.max(...Object.values(initialScore)),
        );
    }

    return {
        initialScore,
        initialPlayer,
        initialGuesses,
    };
}
