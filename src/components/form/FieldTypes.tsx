import { type Dispatch, type SetStateAction, useContext } from "react";
import { useSearchParams } from "react-router";
import { wordArrays, gameTypes, defaultGameSets } from "../../data/data";
import { labels } from "../../data/formLabels";
import MainContext from "../Context";

interface IFieldTypesProps {
    handleChange: Dispatch<SetStateAction<number>>
}

export default function FieldTypes(props: React.PropsWithChildren<IFieldTypesProps>) {
    const {lang, size} = useContext(MainContext);
    const [searchParams] = useSearchParams();
    const prevType = searchParams.get("prevType");
    const defaultCheck = prevType ? Number.parseInt(prevType) : 0;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        const value = Number.parseInt(e.target.value) - 1;
        const defaultSet = defaultGameSets[gameTypes[value]];
        const defaultSetIndex = defaultSet ? wordArrays.indexOf(defaultSet) : -1;

        if (defaultSetIndex > -1) {
            props.handleChange(2 ** defaultSetIndex);
        }
    }

    return (
        <fieldset className="mb-4">
            <label
                htmlFor="type"
                className={`block mb-2 font-bold ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
            >
                {labels.types[lang].topLabel}
            </label>
            <select
                name="type"
                id="type"
                defaultValue={defaultCheck}
                className={`border-2 rounded-md p-2 pt-1 pb-1 w-full cursor-pointer ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
                onChange={handleChange}
            >
                {gameTypes.map((type, index) => {
                    return (
                        <option key={type} value={index + 1} className="dark:bg-t-dark dark:text-white">
                            {labels.types[lang][type]}
                        </option>
                    );
                })}
            </select>
        </fieldset>
    );
}
