import {JSX} from "react";

type ButtonType = {
    title: string
    onClick?: () => void
    disabled?: boolean
    className?: string
}

export function Button({title, onClick, disabled, className}: ButtonType): JSX.Element {
    return (
        <button className={className} disabled={disabled} onClick={onClick}>{title}</button>
    )
}