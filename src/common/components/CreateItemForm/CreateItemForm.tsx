import { ChangeEvent, useState } from "react"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"

type CreateItemFormPropsType = {
  createTitle: (title: string) => void
  disabled?: boolean
}

export const CreateItemForm = ({ createTitle, disabled }: CreateItemFormPropsType) => {
  const [titleInputValue, setTitleInputValue] = useState("")
  const [error, setError] = useState(false)

  const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitleInputValue(e.currentTarget.value)
  }

  const createTitleHandler = () => {
    const trimmedItemTitle = titleInputValue.trim()
    if (trimmedItemTitle === "") {
      setError(true)
    } else {
      createTitle(trimmedItemTitle)
    }
    setTitleInputValue("")
  }

  return (
    <div>
      <TextField
        size="small"
        value={titleInputValue}
        onChange={setTitleInputHandler}
        onKeyDown={(e) => {
          e.key === "Enter" && createTitleHandler()
        }}
        helperText={error && "enter valid title"}
        error={error}
        disabled={disabled}
      />
      <IconButton disabled={disabled} onClick={createTitleHandler}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </div>
  )
}
