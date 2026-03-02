import {JSX} from "react";

type ButtonType = {
    title: string
}

export function Button({title}: ButtonType): JSX.Element {
    return (
        <button>{title}</button>
    )
}