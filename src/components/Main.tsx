import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import packageJson from "../../package.json";
import type { IContext, IContextOptions, IModalData } from "../models/context.models";
import { getDefaultLang, getDefaultTheme } from "../utils/getDefaults.ts";
import Header from "./Header";
import Modal from "./Modal";
import MainContext from "./Context";

const contextOptions: IContextOptions = {
    // theme: ['light', 'dark', 'halloween', 'xmas'],
    theme: ["light", "dark"],
    // lang: ['pl', 'en', 'plen'],
    lang: ["pl", "en"],
    size: ["normal", "large", "small"],
    bossView: ["grid", "list", "both"],
};

export default function Main() {
    // preparation
    const defaultTheme = getDefaultTheme();
    const defaultLang = getDefaultLang();
    const defaultSize = localStorage.getItem("size") as IContext["size"] ?? "normal";
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/");

    // states
    const [theme, setTheme] = useState<IContext["theme"]>(defaultTheme);
    const [lang, setLang] = useState<IContext["lang"]>(defaultLang);
    const [size, setSize] = useState<IContext["size"]>(defaultSize);
    const [bossView, setBossView] = useState<IContext["bossView"]>("list");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<IModalData>({
        type: "guess",
        replacement: {pl: "a", en: "b"},
    });

    const binaryThemeClassName = theme === "light" ? "light" : "dark";

    // handlers
    const openModal = (data: IModalData) => {
        setModalData((_prev) => {
            const newData = {...data};
            return newData;
        });
        setModalOpen(true);
    };

    useEffect(() => {
        console.log(packageJson.version);
    }, []);

    return (
        <MainContext.Provider
            value={{
                theme,
                lang,
                size,
                bossView,
                animationDelay: 300,
                openModal,
            }}
        >
            <main
                className={`${binaryThemeClassName} bg-t-light ${isBoss ? "p-2" : "pt-2 pb-4 pl-4 pr-4"} text-black border-bg-t-dark dark:bg-t-dark dark:text-white dark:border-bg-t-light h-screen font-main`}
            >
                <Header
                    setters={{setTheme, setLang, setSize, setBossView}}
                    contextOptions={contextOptions}
                />
                <Modal data={modalData} open={modalOpen} setter={setModalOpen}/>
                <Outlet/>
            </main>
        </MainContext.Provider>
    );
}
