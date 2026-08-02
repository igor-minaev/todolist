import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { containerSx } from "@/common/styles/container.styles"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  type TaskType,
} from "@/features/todolists/model/tasks-slice"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Box } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      changeTaskStatusAC({
        taskId: task.id,
        isDone: e.currentTarget.checked,
        id: todolistId,
      }),
    )
  const changeTaskTitleHandler = (title: string) =>
    dispatch(
      changeTaskTitleAC({
        taskId: task.id,
        title,
        id: todolistId,
      }),
    )

  const deleteTaskHandler = () => dispatch(deleteTaskAC({ taskId: task.id, id: todolistId }))

  return (
    <ListItem disablePadding sx={containerSx}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox size="medium" onChange={changeTaskStatusHandler} checked={task.isDone} />
        <Box sx={getListItemSx(task.isDone)}>
          <EditableSpan title={task.title} editeItemTitle={changeTaskTitleHandler} />
        </Box>
      </Box>
      <IconButton onClick={deleteTaskHandler}>
        <HighlightOffIcon />
      </IconButton>
    </ListItem>
  )
}
