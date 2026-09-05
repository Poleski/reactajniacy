import type { ILabels} from '../models/data.models.ts';

export const labels: ILabels = {
    seed: {
        pl: "ID gry:",
        en: "Game ID:",
    },
    types: {
        pl: {
            topLabel: "Rodzaj gry:",
            coopLabel: "Coop?",
            normal: "Klasyczny",
            pictures: "Obrazkowy",
            xl: "6x6",
            xs: "4x4",
            threes: "Trzy drużyny",
            threes_skirmish: "Trzy drużyny extra",
            duet: "Duet",
            duet_xl: "Duet 6x6",
            duet_xs: "Duet 4x4",
            duet_pictures: "Duet obrazkowy",
            // tercet: "Tercet"
        },
        en: {
            topLabel: "Game type:",
            coopLabel: "Coop?",
            normal: "Classic",
            pictures: "Pictures",
            xl: "6x6",
            xs: "4x4",
            threes: "Three teams",
            threes_skirmish: "Three teams skirmish",
            duet: "Duet",
            duet_xl: "Duet 6x6",
            duet_xs: "Duet 4x4",
            duet_pictures: "Pictures duet",
            // tercet: "Tercet"
        },
    },
    sets: {
        pl: {
            topLabel: "Zestawy wyrazów:",
            base: "Tajniacy",
            // duet: "Tajniacy: Duet",
            // after: "Tajniacy: Bez Cenzury",
            pictures_0_279: "Tajniacy: Obrazki",
            halloween: "Bonus: Halloween",
            xmas: "Bonus: Boże Narodzenie",
            inside: "Bonus: prywatne",
        },
        en: {
            topLabel: "Word sets:",
            base: "Codenames",
            // duet: "Codenames: Duet",
            // after: "Codenames: Deep Undercover",
            pictures_0_279: "Codenames Pictures",
            halloween: "Bonus: Halloween",
            xmas: "Bonus: Christmas",
            inside: "Bonus: other",
        },
    },
    submit: {
        pl: "Rozpocznij grę",
        en: "Start game",
    },
};
