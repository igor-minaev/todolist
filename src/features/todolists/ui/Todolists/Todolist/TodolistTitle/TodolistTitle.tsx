import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  type DomainTodolist,
} from "@/features/todolists/model/todolists-slice"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"

type PropsType = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: PropsType) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const changeTodolistTitleHandler = (title: string) => dispatch(changeTodolistTitleTC({ id, title }))

  const deleteTodolistHandler = () => dispatch(deleteTodolistTC(id))

  return (
    <Typography align="center" variant="h5" sx={{ fontWeight: "bold" }}>
      <EditableSpan title={title} editeItemTitle={changeTodolistTitleHandler} />
      <IconButton onClick={deleteTodolistHandler}>
        <HighlightOffIcon />
      </IconButton>
    </Typography>
  )
}
