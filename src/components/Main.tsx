import { useEffect, useReducer, useState } from "react";
import { Outlet, useLocation } from "react-router";
import packageJson from "../../package.json";
import type { IContext, IModalData } from "../models/context.models";
import { getDefault } from "../utils/getDefaults.ts";
import Header from "./Header";
import Modal from "./Modal";
import MainContext from "./Context";
import ContextReducer from "../state/ContextReducer.ts";
import type { ISchemaPlayersOnly } from "../models/data.models.ts";

export default function Main() {
    // preparation
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/") || pathname.includes("/bosscoop/");
    // states
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<IModalData>({
        type: "guess",
        replacement: {pl: "a", en: "b"},
    });
    const [coop, setCoop] = useState<Array<keyof ISchemaPlayersOnly> | false>(false);
    const [bgColor, setBgColor] = useState<string>("");
    const [bgColorClassName, setBgColorClassName] = useState<string>("");

    const [state, dispatch] = useReducer(ContextReducer, {
        theme: getDefault("theme", window.matchMedia("(prefers-color-scheme: dark)",).matches ? "dark" : "light"),
        lang: getDefault("lang", navigator.language.includes('pl') ? 'pl' : 'en'),
        size: localStorage.getItem("size") as IContext["size"] ?? "normal",
        bossView: getDefault("bossView", "list"),
    })

    const binaryThemeClassName = state.theme === "light" ? "light" : "dark";

    // handlers
    const openModal = (data: IModalData) => {
        setModalData(() => {
            return {...data};
        });
        setModalOpen(true);
    };

    useEffect(() => {
        console.log(packageJson.version);
    }, []);

    useEffect(() => {
        if (bgColor === "red") {
            setBgColorClassName("bg-t-light-coop-red dark:bg-t-dark-coop-red")
        } else if (bgColor === "blue") {
            setBgColorClassName("bg-t-light-coop-blue dark:bg-t-dark-coop-blue")
        } else if (bgColor === "green") {
            setBgColorClassName("bg-t-light-coop-green dark:bg-t-dark-coop-green")
        }
    }, [bgColor]);

    return (
        <MainContext.Provider
            value={{
                ...state,
                animationDelay: isBoss ? 0 : 300,
                openModal
            }}
        >
            <main
                className={`${binaryThemeClassName} bg-t-light ${isBoss ? "p-2" : "pt-2 pb-4 pl-4 pr-4"} text-black border-bg-t-dark dark:bg-t-dark dark:text-white dark:border-bg-t-light h-screen font-main ${bgColorClassName}`}
            >
                <Header
                    dispatch={dispatch}
                />
                <Modal data={modalData} open={modalOpen} setter={setModalOpen} coop={coop} />
                <Outlet context={{
                    setCoop,
                    setBgColor
                }} />
            </main>
        </MainContext.Provider>
    );
}
