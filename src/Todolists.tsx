import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "@/Todolist";
import {getFilteredTasks} from "@/utils";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/model/tasks-selectors";
import {selectTodolists} from "@/model/todolists-selectors";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    type FilterValuesType
} from "@/model/todolists-reducer";


export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const deleteTask = (taskId: string, todolistId: string) => {
        dispatch(deleteTaskAC({taskId, id: todolistId}))

    }

    const createTask = (title: string, todolistId: string) => {
        dispatch(createTaskAC({title, id: todolistId}))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone, id: todolistId}))
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC({taskId, title, id: todolistId}))
    }

// todolists
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))

    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }

    return (
        <>
            {todolists.map(tl => (
                <Grid key={tl.id}>
                    <Paper elevation={8} sx={{p: '15px'}}>
                        <Todolist id={tl.id}
                                  title={tl.title}
                                  filter={tl.filter}
                                  tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                                  deleteTask={deleteTask}
                                  changeTodolistFilter={changeTodolistFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                                  changeTodolistTitle={changeTodolistTitle}
                                  changeTaskTitle={changeTaskTitle}
                        />
                    </Paper>
                </Grid>
            ))}
        </>
    )
}