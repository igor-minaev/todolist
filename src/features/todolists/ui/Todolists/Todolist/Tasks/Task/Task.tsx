import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enum/enum"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { containerSx } from "@/common/styles/container.styles"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC } from "@/features/todolists/model/tasks-slice"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Box } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"

type Props = {
  task: DomainTask
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

  const deleteTaskHandler = () => dispatch(deleteTaskTC({ taskId: task.id, todolistId }))
  const isCompletedTask = task.status === TaskStatus.Completed

  return (
    <ListItem disablePadding sx={containerSx}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox size="medium" onChange={changeTaskStatusHandler} checked={isCompletedTask} />
        <Box sx={getListItemSx(isCompletedTask)}>
          <EditableSpan title={task.title} editeItemTitle={changeTaskTitleHandler} />
        </Box>
      </Box>
      <IconButton onClick={deleteTaskHandler}>
        <HighlightOffIcon />
      </IconButton>
    </ListItem>
  )
}
