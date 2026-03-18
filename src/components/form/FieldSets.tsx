import { useContext } from "react";
import { FaCheck } from "react-icons/fa6";
import { useSearchParams } from "react-router";
import { wordArrays } from "../../data/data";
import { labels } from "../../data/formLabels";
import { deconstructSets } from "../../utils/getSets";
import MainContext from "../Context";

interface IFieldSetsProps {
    defaultSets: number
}

export default function FieldSets(props: React.PropsWithChildren<IFieldSetsProps>) {
    const {lang, size} = useContext(MainContext);
    const [searchParams] = useSearchParams();
    const prevSets: number = props.defaultSets > 0 ? props.defaultSets : (searchParams.get("prevSets") !== null ? Number.parseInt((searchParams.get("prevSets") as string)) : 0);
    const wordSets = prevSets ? deconstructSets(prevSets) : [1];

    return (
        <fieldset className="mb-4">
            <h2
                className={`block mb-2 font-bold ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
            >
                {labels.sets[lang].topLabel}
            </h2>
            <ul>
                {wordArrays.map((set, index) => {
                    return (
                        <li key={set}>
                            <label
                                className={`cursor-pointer inline-block mb-1 ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    name="set"
                                    id=""
                                    value={2 ** index}
                                    defaultChecked={wordSets.includes(2 ** index) && true}
                                    className="appearance-none peer"
                                />
                                <span
                                    className={`fake-input inline-block border-2 p-0.5 text-t-light border-t-dark dark:border-white dark:text-t-dark dark:bg-t-dark rounded-sm align-middle peer-checked:bg-t-dark dark:peer-checked:bg-white ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
                                >
									<FaCheck/>
								</span>
                                <span className="align-middle ml-2">
									{labels.sets[lang][set]}
								</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </fieldset>
    );
}
