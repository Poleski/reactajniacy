import { Suspense, useContext, useState } from "react";
import { Await, useLoaderData } from "react-router";
import type { IAllClicked, IReadyData } from "../../models/data.models";
import MainContext from "../Context";
import ListBoard from "./board-elements/ListBoard.tsx";
import WordBoard from "./board-elements/WordBoard.tsx";

export default function BossBoard() {
    const data: { words: IReadyData[]; schemaMap: string[] } =
        useLoaderData();
    const {bossView} = useContext(MainContext);
    const initialClicked: IAllClicked = {};
    for (const word of data.words) {
        if ("fileName" in word) {
            initialClicked[word.fileName] = false;
        } else if ("pl" in word) {
            initialClicked[word.pl] = false;
        }
    }
    const [allClicked, setAllClicked] = useState(initialClicked);

    const handleClick = (guess: IReadyData) => {
        setAllClicked((prev) => {
            const newClicked = {...prev};
            if ("fileName" in guess) {
                newClicked[guess.fileName] = !newClicked[guess.fileName];
            } else if ("pl" in guess) {
                newClicked[guess.pl] = !newClicked[guess.pl];
            }
            return newClicked;
        });
    };

    return (
        <Suspense fallback={<p>loading</p>}>
            <Await resolve={data}>
                {(bossView === "grid" || bossView === "both") && (
                    <WordBoard
                        words={data.words}
                        onClick={handleClick}
                        allClicked={allClicked}
                    />
                )}
                {(bossView === "list" || bossView === "both") && (
                    <ListBoard
                        words={data.words}
                        onClick={handleClick}
                        allClicked={allClicked}
                        bossView={bossView}
                    />
                )}
            </Await>
        </Suspense>
    );
}
