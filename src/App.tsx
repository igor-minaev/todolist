import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useReducer, useState} from "react";
import {getFilteredTasks} from "./utils.ts";
import {FilterValuesType, TaskType} from "./types.ts";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import {NavButton} from "./NavButton.ts";
import {createTheme, CssBaseline, Switch, ThemeProvider} from "@mui/material";
import {containerSx} from "./Todolist.style.ts";
import {purple, amber} from "@mui/material/colors";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    // const tasksNumber = useRef<number>(3)
    // data

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    // const [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistId_1, title: "What to learn", filter: "all"},
    //     {id: todolistId_2, title: "What to buy", filter: "all"}
    // ])

    const [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
            {id: v1(), title: "RTK", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: false},

        ]
    })


    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "REACT", isDone: false},
    //         {id: v1(), title: "REDUX", isDone: false},
    //         {id: v1(), title: "RTK", isDone: false},
    //     ],
    //     [todolistId_2]: [
    //         {id: v1(), title: "Bread", isDone: true},
    //         {id: v1(), title: "Meat", isDone: true},
    //         {id: v1(), title: "Milk", isDone: false},
    //
    //     ]
    // })

// tasks
    const deleteTask = (taskId: TaskType["id"], todolistId: string) => {
        dispatchToTasks(deleteTaskAC({taskId, todolistId}))

    }

    const createTask = (title: TaskType["title"], todolistId: string) => {
        dispatchToTasks(createTaskAC({title, todolistId}))
    }

    const changeTaskStatus = (taskId: TaskType['id'], isDone: TaskType['isDone'], todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC({taskId, isDone, todolistId}))
    }

    const changeTaskTitle = (taskId: TaskType['id'], title: TaskType['title'], todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC({taskId, title, todolistId}))
    }

// todolists
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchToTodolist(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const changeTodolistTitle = (title: TodolistType['title'], todolistId: string) => {
        dispatchToTodolist(changeTodolistTitleAC({id: todolistId, title}))

    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const createTodolist = (title: TodolistType['title']) => {
        const action = createTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
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
