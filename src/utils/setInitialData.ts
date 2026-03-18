import type { IAllClicked, IImageReadyData, ISchema, ISchemaPlayersOnly, IWordReadyData } from "../models/data.models";

const roles: Array<keyof ISchemaPlayersOnly> = ["red", "blue", "green"];

export default function setInitialData(data: {
    words: (IWordReadyData[] | IImageReadyData[]);
    schemaMap: (keyof ISchema)[];
}) {
    const initialScore: ISchemaPlayersOnly = {red: 0, blue: 0};
    const initialClicked: IAllClicked = {};
    const initialGuesses: (IWordReadyData[] | IImageReadyData[])[] = [];

    roles.forEach((role) => {
        const count = data.schemaMap.filter(
            (currentRole) => currentRole === role,
        ).length;
        if (count > 0) {
            initialScore[role] = count;
        }
    });

    const initialPlayer = Object.values(initialScore).indexOf(
        Math.max(...Object.values(initialScore)),
    );

    data.words.forEach((word) => {
        if ("fileName" in word) {
            initialClicked[word.fileName] = false;
        } else {
            initialClicked[word.pl] = false;
        }
    });

    (Object.keys(initialScore) as Array<keyof ISchemaPlayersOnly>).forEach(
        () => {
            initialGuesses.push([]);
        },
    );

    return {
        initialScore,
        initialPlayer,
        initialClicked,
        initialGuesses,
    };
}
