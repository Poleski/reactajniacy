import type { ButtonHTMLAttributes } from "react";

type IButtonEvent = React.MouseEvent | React.KeyboardEvent;

export default function buttonize(
    handlerFn: (event: IButtonEvent) => void,
): ButtonHTMLAttributes<HTMLButtonElement> {
    return {
        role: "button",
        type: "button",
        tabIndex: 0,
        onClick: (event) => {
            handlerFn(event);
        },
        onKeyDown: (event) => {
            if (event.code === "13") handlerFn(event);
        },
    };
}
