import Button from '@mui/material/Button';
import {CreateItemForm} from "./CreateItemForm.tsx";
import {Box} from "@mui/material";
import {containerSx} from "./Todolist.style.ts";
import {createTaskAC} from "@/model/tasks-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTodolistFilterAC, type FilterValuesType, type TodolistType} from "@/model/todolists-reducer";
import {TodolistTitle} from "@/TodolistTitle";
import {Tasks} from "@/Tasks";

type PropsType = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: PropsType) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()


    const createTaskHandler = (taskTitle: string) => dispatch(createTaskAC({title: taskTitle, id}))

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createTitle={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <Box sx={containerSx}>
                <Button size='small' variant="contained" color={filter === "all" ? "secondary" : "primary"} onClick={() => changeFilterHandler("all")}>All</Button>
                <Button size='small' variant="contained" color={filter === "active" ? "secondary" : "primary"} onClick={() => changeFilterHandler("active")}>Active</Button>
                <Button size='small' variant="contained" color={filter === "completed" ? "secondary" : "primary"} onClick={() => changeFilterHandler("completed")}>Completed</Button>
            </Box>
        </div>
    )
        ;
};
