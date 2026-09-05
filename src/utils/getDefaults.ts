import type { IContextTogglables } from "../models/context.models";

export const getDefault = <T extends IContextTogglables, U extends keyof T>(toggle: U, initial: T[U]) => {
    const saved = localStorage.getItem(toggle as string & U) as T[U];
    return saved ?? initial;
}
