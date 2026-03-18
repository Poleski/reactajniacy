import { useContext, useState } from "react";
import { Form } from "react-router";
import { labels } from "../../data/formLabels";
import MainContext from "../Context";
import FieldSeed from "./FieldSeed";
import FieldSets from "./FieldSets";
import FieldTypes from "./FieldTypes";

export default function GameForm() {
    const {lang, size} = useContext(MainContext);
    const [defaultSets, setDefaultSets] = useState(0);

    return (
        <div className="game-form-container h-full flex justify-center items-start" data-testid="game-form">
            <Form
                method="post"
                className="h-auto min-h-1/3 p-4 mt-2 border-2 rounded-xl flex flex-col justify-between"
            >
                <FieldSeed/>
                <FieldTypes handleChange={setDefaultSets} />
                <FieldSets defaultSets={defaultSets} key={defaultSets} />
                <fieldset className="grow text-center">
                    <button
                        type="submit"
                        className={`font-bold p-1 pl-4 pr-4 border-2 border-t-light-green rounded-xl hover:bg-t-light-green transition-colors cursor-pointer m-auto ${size === "normal" ? "text-lg" : ""}${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-md" : ""}`}
                    >
                        {labels.submit[lang]}
                    </button>
                </fieldset>
            </Form>
        </div>
    );
}
