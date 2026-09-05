import { type Dispatch, useContext } from "react";
import { BiFontSize } from "react-icons/bi";
import { IoQrCode } from "react-icons/io5";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineDarkMode, MdOutlineGridView } from "react-icons/md";
import { useLocation } from "react-router";
import MainContext from "./Context";
import type { IContextTogglables } from "../models/context.models";
import buttonize from "./a11y/buttonize";

interface IHeaderProps {
    dispatch: Dispatch<{type: keyof IContextTogglables}>;
}

export default function Header(props: React.PropsWithChildren<IHeaderProps>) {
    const {pathname} = useLocation();
    const isBoss = pathname.includes("/boss/") || pathname.includes("/bosscoop/");    const dispatch = props.dispatch;
    const { openModal } = useContext(MainContext);

    const showQRCode = () => {
        openModal({type: "qrCode"});
    };

    // Halloween: GiMoonBats
    // Xmas: TbChristmasTree

    return (
        <header className="pt-4 pb-8 text-right flex justify-end text-2xl">
            <button className="ml-3 cursor-pointer" {...buttonize(() => {
                dispatch({type: "theme"})
            })}>
                <MdOutlineDarkMode/>
            </button>
            <button className="ml-3 cursor-pointer" {...buttonize(() => {
                dispatch({type: "lang"})
            })}>
                <LiaLanguageSolid/>
            </button>
            {isBoss && (
                <button className="ml-3 cursor-pointer" {...buttonize(() => {
                    dispatch({type: "bossView"})
                })}>
                    <MdOutlineGridView/>
                </button>
            )}
            {!isBoss && (
                <button className="ml-3 cursor-pointer" {...buttonize(() => {
                    dispatch({type: "size"})
                })}>
                    <BiFontSize/>
                </button>
            )}
            {!isBoss && pathname !== "/" && (
                <button className="ml-3 cursor-pointer" {...buttonize(showQRCode)}>
                    <IoQrCode/>
                </button>
            )}
        </header>
    );
}
