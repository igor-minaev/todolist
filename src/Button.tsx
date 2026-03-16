import {JSX} from "react";

type ButtonType = {
    title: string
    onClick?: () => void
    disabled?: boolean
}

export function Button({title, onClick, disabled}: ButtonType): JSX.Element {
    return (
        <button disabled={disabled} onClick={onClick}>{title}</button>
    )
}