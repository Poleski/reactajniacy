import type { IContext, IContextTogglables } from "../models/context.models.ts";
import { createContext } from "react";

const initialTogglables: IContextTogglables = {
    theme: "light",
    lang: "pl",
    size: "normal",
    bossView: "list"
}

const initialContext: IContext = {
    ...initialTogglables,
    animationDelay: 500,
    openModal: () => {}
};

const MainContext: React.Context<IContext> = createContext(initialContext);
export default MainContext;
