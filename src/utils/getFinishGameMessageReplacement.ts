interface IFinishGameTypeReplacement {
    pl: string,
    en: string,
}

const getFinishGameMessageReplacement = (winnerId: number): IFinishGameTypeReplacement => {
    switch (winnerId) {
        case 0:
            return {
                "pl": "Czerwoni",
                "en": "Red team"
            };
        case 1:
            return {
                pl: "Niebiescy",
                en: "Blue team"
            };
        case 2:
            return {
                pl: "Zieloni",
                en: "Green team"
            };
        default:
            return {
                pl: "ERROR",
                en: "ERROR"
            }
    }
}

export default getFinishGameMessageReplacement;
