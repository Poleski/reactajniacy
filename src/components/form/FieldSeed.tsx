import { useContext, useRef } from "react";
import { FaRandom } from "react-icons/fa";
import { labels } from "../../data/formLabels";
import buttonize from "../a11y/buttonize";
import MainContext from "../Context";

const CHARS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@$^*()";

function generateSeed(length = 10) {
    let result = "";
    for (let i = length; i > 0; i--) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    return result;
}

export default function FieldSeed() {
    const {lang, size} = useContext(MainContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef?.current) {
            inputRef.current.value = generateSeed();
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.value = "";
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            e.target.value = generateSeed();
        }
    };

    return (
        <fieldset className="mb-4">
            <label
                htmlFor="seed"
                className={`block mb-2 font-bold ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
            >
                {labels.seed[lang]}
            </label>
            <input
                ref={inputRef}
                id="seed"
                name="seed"
                type="text"
                defaultValue={generateSeed()}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`border-2 rounded-md p-2 pt-1 pb-1 w-40 ${size === "large" ? "text-2xl w-50" : ""}${size === "small" ? "text-sm" : ""}`}
            />
            <button
                className={`cursor-pointer p-2 border-2 rounded-md align-top ml-2 transition-colors dark:hover:bg-white dark:hover:text-t-dark dark:hover:border-white hover:bg-t-dark hover:text-white hover:border-t-dark ${size === "large" ? "text-2xl" : ""}${size === "small" ? "text-sm" : ""}`}
                {...buttonize(handleClick)}
            >
                <FaRandom/>
            </button>
        </fieldset>
    );
}
