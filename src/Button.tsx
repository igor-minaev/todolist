import {JSX} from "react";

type ButtonType = {
    title: string
    onClick?: () => void
}

export function Button({title, onClick}: ButtonType): JSX.Element {
    return (
        <button onClick={onClick}>{title}</button>
    )
}