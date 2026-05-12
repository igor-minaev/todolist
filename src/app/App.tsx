import './App.css'
import {Todolist} from "../Todolist.tsx";
import {useState} from "react";
import {getFilteredTasks} from "../utils.ts";
import {FilterValuesType, TaskType} from "../types.ts";
import {CreateItemForm} from "../CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import {NavButton} from "../NavButton.ts";
import {createTheme, CssBaseline, Switch, ThemeProvider} from "@mui/material";
import {containerSx} from "../Todolist.style.ts";
import {amber, purple} from "@mui/material/colors";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}


function App() {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()


// tasks
    const deleteTask = (taskId: TaskType["id"], todolistId: string) => {
        dispatch(deleteTaskAC({taskId, todolistId}))

    }

    const createTask = (title: TaskType["title"], todolistId: string) => {
        dispatch(createTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: TaskType['id'], isDone: TaskType['isDone'], todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const changeTaskTitle = (taskId: TaskType['id'], title: TaskType['title'], todolistId: string) => {
        dispatch(changeTaskTitleAC({taskId, title, todolistId}))
    }

// todolists
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const changeTodolistTitle = (title: TodolistType['title'], todolistId: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))

    }

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id:todolistId}))
    }

    const createTodolist = (title: TodolistType['title']) => {
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

    const [isDark, setIsDark] = useState(false)

    const theme = createTheme({
        palette: {
            primary: purple,
            secondary: amber,
            mode: isDark ? 'dark' : 'light'
        },
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <Switch onChange={() => setIsDark(!isDark)}/>
                                <NavButton>Sign in</NavButton>
                                <NavButton>FAQ</NavButton>
                                <NavButton>Login</NavButton>
                                <NavButton background={'crimson'}>Logout</NavButton>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{p: "15px 0"}}>
                        <CreateItemForm createTitle={createTodolist} minTitleLength={5} maxTitleLength={10}/>
                    </Grid>
                    <Grid container spacing={6}>
                        {todolistComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App
