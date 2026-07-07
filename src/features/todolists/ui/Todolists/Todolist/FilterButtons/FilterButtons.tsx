import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { containerSx } from "@/common/styles/container.styles"
import {
  changeTodolistFilterAC,
  type DomainTodolist,
  type FilterValuesType,
} from "@/features/todolists/model/todolists-slice"
import { Box } from "@mui/material"

import Button from "@mui/material/Button"

type PropsType = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: PropsType) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const changeFilterHandler = (filter: FilterValuesType) => dispatch(changeTodolistFilterAC({ id, filter }))

  return (
    <Box sx={containerSx}>
      <Button
        size="small"
        variant="contained"
        color={filter === "all" ? "secondary" : "primary"}
        onClick={() => changeFilterHandler("all")}
      >
        All
      </Button>
      <Button
        size="small"
        variant="contained"
        color={filter === "active" ? "secondary" : "primary"}
        onClick={() => changeFilterHandler("active")}
      >
        Active
      </Button>
      <Button
        size="small"
        variant="contained"
        color={filter === "completed" ? "secondary" : "primary"}
        onClick={() => changeFilterHandler("completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
