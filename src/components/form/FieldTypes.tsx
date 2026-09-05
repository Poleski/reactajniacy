import { type Dispatch, type SetStateAction, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { wordArrays, gameTypes, gameTypesCoop, defaultGameSets } from "../../data/data";
import { labels } from "../../data/formLabels";
import MainContext from "../Context";
import { FaCheck } from "react-icons/fa6";

interface IFieldTypesProps {
    handleChange: Dispatch<SetStateAction<number>>
}

export default function FieldTypes(props: React.PropsWithChildren<IFieldTypesProps>) {
    const { lang, size } = useContext(MainContext);
    const [searchParams] = useSearchParams();
    const [prevType, setPrevType] = useState(searchParams.get("prevType"))
    const defaultCheck = prevType ? Number.parseInt(prevType) : 0;
    const [coop, setCoop] = useState(searchParams.get("coop") === "true");
    const [type, setTypes] = useState<Partial<keyof typeof defaultGameSets>[]>([...gameTypes]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setPrevType("1");
        const value = Number.parseInt(e.target.value) - 1;
        const gameTypesValue = coop ? gameTypesCoop[value] : gameTypes[value]
        const defaultSet = defaultGameSets[gameTypesValue];
        const defaultSetIndex = defaultSet ? wordArrays.indexOf(defaultSet) : -1;

        if (defaultSetIndex > -1) {
            props.handleChange(2 ** defaultSetIndex);
        }
    }

    const handleChangeCoop = ()=> {
        setCoop(!coop);
    }

    useEffect(() => {
        setTypes(coop ? [...gameTypesCoop] : [...gameTypes]);
    }, [coop])

    return (
        <fieldset className="mb-4">
            <label
                htmlFor="type"
                className={`flex justify-between mb-2 font-bold ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
            >
                <span>{labels.types[lang].topLabel}</span>
                <span>{labels.types[lang].coopLabel}</span>
            </label>
            <select
                name="type"
                id="type"
                defaultValue={defaultCheck}
                className={`border-2 rounded-md p-2 pt-1 pb-1 w-40 cursor-pointer ${size === "large" ? "text-2xl w-50" : ""}${size === "small" ? "text-sm" : ""}`}
                onChange={handleChange}
            >
                {type.map((type, index) => {
                    return (
                        <option key={type} value={index + 1} className="dark:bg-t-dark dark:text-white">
                            {labels.types[lang][type]}
                        </option>
                    );
                })}
            </select>
            <label
                className={`cursor-pointer inline-block mb-1 ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
            >
                <input
                    type="checkbox"
                    name="coop"
                    id=""
                    defaultChecked={coop}
                    onChange={handleChangeCoop}
                    className="appearance-none peer"
                />
                <span
                    className={`fake-input inline-block border-2 p-2 ml-2 text-t-light border-t-dark dark:border-white dark:text-t-dark dark:bg-t-dark rounded-sm align-middle peer-checked:bg-t-dark dark:peer-checked:bg-white ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
                >
                    <FaCheck/>
                </span>
            </label>
        </fieldset>
    );
}
