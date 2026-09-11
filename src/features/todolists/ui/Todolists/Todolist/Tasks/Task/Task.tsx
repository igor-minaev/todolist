import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enum/enum"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { containerSx } from "@/common/styles/container.styles"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice"
import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Box } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { getListItemSx } from "./Task.styles"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const { id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ ...task, status }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ ...task, title }))
  }

  const deleteTaskHandler = () => dispatch(deleteTaskTC({ todolistId: id, taskId: task.id }))
  const isCompletedTask = task.status === TaskStatus.Completed

  return (
    <ListItem disablePadding sx={containerSx}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          size="medium"
          onChange={changeTaskStatusHandler}
          checked={isCompletedTask}
          disabled={entityStatus === "loading"}
        />
        <Box sx={getListItemSx(isCompletedTask)}>
          <EditableSpan
            title={task.title}
            editeItemTitle={changeTaskTitleHandler}
            disabled={entityStatus === "loading"}
          />
        </Box>
      </Box>
      <IconButton onClick={deleteTaskHandler} disabled={entityStatus === "loading"}>
        <HighlightOffIcon />
      </IconButton>
    </ListItem>
  )
}
