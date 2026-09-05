import type { IContextOptions, IContextTogglables } from "../models/context.models.ts";

const contextOptions: IContextOptions = {
    // theme: ['light', 'dark', 'halloween', 'xmas'],
    theme: ["light", "dark"],
    lang: ["pl", "en"],
    size: ["normal", "large", "small"],
    bossView: ["grid", "list", "both"],
};

function toggleContext<T extends IContextTogglables, U extends keyof IContextOptions>(state: T, value: U): T[U] | false {
    if (value in state) {
        const options = contextOptions[value] as T[U][];
        const currentIndex: number = options.indexOf(state[value]);
        return currentIndex === options.length - 1 ? options[0] : options[currentIndex + 1];
    }
    return false;
}

export default function ContextReducer(state: IContextTogglables, action: {type: keyof IContextTogglables}): IContextTogglables  {
    const oldState = state;
    let newValue: IContextTogglables[keyof IContextTogglables] | false;

    switch (action.type) {
        case "theme":
            newValue = toggleContext(state, action.type);
            if (newValue) {
                localStorage.setItem(action.type, newValue);
                return {...oldState, theme: newValue}
            }
            return oldState;
        case "size":
            newValue = toggleContext(state, action.type);
            if (newValue) {
                localStorage.setItem(action.type, newValue);
                return {...oldState, size: newValue}
            }
            return oldState;
        case "bossView":
            newValue = toggleContext(state, action.type);
            if (newValue) {
                localStorage.setItem(action.type, newValue);
                return {...oldState, bossView: newValue}
            }
            return oldState;
        case "lang":
            newValue = toggleContext(state, action.type);
            if (newValue) {
                localStorage.setItem(action.type, newValue);
                return {...oldState, lang: newValue}
            }
            return oldState;
        default:
            return oldState;
    }
}
