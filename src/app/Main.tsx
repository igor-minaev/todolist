import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/CreateItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "@/Todolist";
import {getFilteredTasks} from "@/utils";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC, type FilterValuesType
} from "@/model/todolists-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTodolists} from "@/model/todolists-selectors";
import {selectTasks} from "@/model/tasks-selectors";

export const Main = () => {

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

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }
    const todolistComponents = todolists.map(tl => (
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
    ))
    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{p: "15px 0"}}>
                <CreateItemForm createTitle={createTodolist} minTitleLength={5} maxTitleLength={20}/>
            </Grid>
            <Grid container spacing={6}>
                {todolistComponents}
            </Grid>
        </Container>
    )
}