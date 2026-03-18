import { type Dispatch, type SetStateAction, useContext } from "react";
import { BiFontSize } from "react-icons/bi";
import { IoQrCode } from "react-icons/io5";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineDarkMode, MdOutlineGridView } from "react-icons/md";
import { useLocation } from "react-router";
import MainContext from "./Context";
import type { IContext, IContextOptions } from "../models/context.models";
import buttonize from "./a11y/buttonize";

interface IHeaderProps {
    setters: {
        //setTheme: (theme: IContext['theme']) => void,
        setTheme: Dispatch<SetStateAction<IContext["theme"]>>;
        setLang: Dispatch<SetStateAction<IContext["lang"]>>;
        setSize: Dispatch<SetStateAction<IContext["size"]>>;
        setBossView: Dispatch<SetStateAction<IContext["bossView"]>>;
    };
    contextOptions: IContextOptions;
}

export default function Header(props: React.PropsWithChildren<IHeaderProps>) {
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/");
    const {setTheme, setLang, setSize, setBossView} = props.setters;
    const {openModal} = useContext(MainContext);

    const changeTheme = () => {
        setTheme((prev: IContext["theme"]) => {
            let newTheme = prev;
            const currentThemeIndex = props.contextOptions.theme.indexOf(newTheme);
            if (currentThemeIndex === props.contextOptions.theme.length - 1) {
                newTheme = props.contextOptions.theme[0];
            } else {
                newTheme = props.contextOptions.theme[currentThemeIndex + 1];
            }
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    const changeLang = () => {
        setLang((prev: IContext["lang"]) => {
            let newLang = prev;
            const currentLangIndex = props.contextOptions.lang.indexOf(newLang);
            if (currentLangIndex === props.contextOptions.lang.length - 1) {
                newLang = props.contextOptions.lang[0];
            } else {
                newLang = props.contextOptions.lang[currentLangIndex + 1];
            }
            localStorage.setItem("lang", newLang);
            return newLang;
        });
    };

    const changeSize = () => {
        setSize((prev: IContext["size"]) => {
            let newSize = prev;
            const currentSizeIndex = props.contextOptions.size.indexOf(newSize);
            if (currentSizeIndex === props.contextOptions.size.length - 1) {
                newSize = props.contextOptions.size[0];
            } else {
                newSize = props.contextOptions.size[currentSizeIndex + 1];
            }
            localStorage.setItem("size", newSize);
            return newSize;
        });
    };

    const changeBossView = () => {
        setBossView((prev: IContext["bossView"]) => {
            let newView = prev;
            const currentBossViewIndex =
                props.contextOptions.bossView.indexOf(newView);
            if (currentBossViewIndex === props.contextOptions.bossView.length - 1) {
                newView = props.contextOptions.bossView[0];
            } else {
                newView = props.contextOptions.bossView[currentBossViewIndex + 1];
            }
            localStorage.setItem("bossView", newView);
            return newView;
        });
    };

    const showQRCode = () => {
        openModal({type: "qrCode"});
    };

    // Halloween: GiMoonBats
    // Xmas: TbChristmasTree

    return (
        <header className="pt-4 pb-8 text-right flex justify-end text-2xl">
            <button className="ml-3 cursor-pointer" {...buttonize(changeTheme)}>
                <MdOutlineDarkMode/>
            </button>
            <button className="ml-3 cursor-pointer" {...buttonize(changeLang)}>
                <LiaLanguageSolid/>
            </button>
            {isBoss && (
                <button className="ml-3 cursor-pointer" {...buttonize(changeBossView)}>
                    <MdOutlineGridView/>
                </button>
            )}
            {!isBoss && (
                <button className="ml-3 cursor-pointer" {...buttonize(changeSize)}>
                    <BiFontSize/>
                </button>
            )}
            {!isBoss && (
                <button className="ml-3 cursor-pointer" {...buttonize(showQRCode)}>
                    <IoQrCode/>
                </button>
            )}
        </header>
    );
}
