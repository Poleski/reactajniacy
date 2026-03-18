import type { IContext } from "../models/context.models.ts";
import { createContext } from "react";

const initialContext: IContext = {
    theme: "light",
    lang: "pl",
    size: "normal",
    bossView: "list",
    animationDelay: 500,
    openModal: () => {
    },
};

const MainContext: React.Context<IContext> = createContext(initialContext);
export default MainContext
