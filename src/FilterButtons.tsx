import {Box} from "@mui/material";
import {containerSx} from "@/Todolist.style";
import Button from "@mui/material/Button";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTodolistFilterAC, type FilterValuesType, type TodolistType} from "@/model/todolists-reducer";

type PropsType = {
    todolist: TodolistType
}

export const FilterButtons = ({todolist}: PropsType) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValuesType) => dispatch(changeTodolistFilterAC({id, filter}))

    return (
        <Box sx={containerSx}>
            <Button size='small' variant="contained" color={filter === "all" ? "secondary" : "primary"} onClick={() => changeFilterHandler("all")}>All</Button>
            <Button size='small' variant="contained" color={filter === "active" ? "secondary" : "primary"} onClick={() => changeFilterHandler("active")}>Active</Button>
            <Button size='small' variant="contained" color={filter === "completed" ? "secondary" : "primary"} onClick={() => changeFilterHandler("completed")}>Completed</Button>
        </Box>
    )
}
