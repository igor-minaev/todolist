import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";

type CreateItemFormPropsType = {
    createTitle: (title: string) => void
    minTitleLength?: number
    maxTitleLength?: number
}

export const CreateItemForm = ({createTitle, minTitleLength = 3, maxTitleLength = 15}: CreateItemFormPropsType) => {
    const [titleInputValue, setTitleInputValue] = useState('')
    const [error, setError] = useState(false)

    const isTaskTitleLengthNotValid = titleInputValue.length < minTitleLength || titleInputValue.length > maxTitleLength

    const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitleInputValue(e.currentTarget.value)
    }

    const createTitleHandler = () => {
        const trimmedItemTitle = titleInputValue.trim()
        if (trimmedItemTitle === '') {
            setError(true)
        } else {
            createTitle(trimmedItemTitle)
        }
        setTitleInputValue('')
    }

    return (
        <div>
            <input
                className={error ? "task-input-error" : ""}
                value={titleInputValue}
                onChange={setTitleInputHandler}
                onKeyDown={(e) => {
                    e.key === "Enter" && !isTaskTitleLengthNotValid && createTitleHandler()
                }}
            />
            <Button disabled={isTaskTitleLengthNotValid}
                    title="+" onClick={createTitleHandler}/>
            {error && <div style={{color: "red"}}>enter valid title</div>}
            {/*<button>+</button>*/}
            {error || titleInputValue.length < minTitleLength &&
                <p>min title length is {minTitleLength} chars</p>}
            {titleInputValue.length >= minTitleLength && titleInputValue.length <= maxTitleLength &&
                < p> max title length is {maxTitleLength} chars</p>}
            {titleInputValue.length > maxTitleLength && <p style={{color: "red"}}>max title is too long
            </p>
            }
        </div>
    );
};

