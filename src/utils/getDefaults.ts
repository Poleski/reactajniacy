import type { IContext } from "../models/context.models";

export const getDefaultTheme = () => {
    let defaultTheme: IContext["theme"] = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches
        ? "dark"
        : "light";
    const savedTheme = localStorage.getItem("theme") as IContext["theme"];
    if (savedTheme) {
        defaultTheme = savedTheme;
    }

    return defaultTheme;
};

export const getDefaultLang = () => {
    let defaultLang: IContext["lang"] = navigator.language.includes('pl') ? 'pl' : 'en';
    const savedLang = localStorage.getItem("lang") as IContext["lang"];
    if (savedLang) {
        defaultLang = savedLang;
    }

    return defaultLang;
}
