import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./utils.ts";
import {FilterValuesType, TaskType} from "./types.ts";
import {v1} from "uuid";

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

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
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


    const deleteTask = (taskId: TaskType["id"], todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const createTask = (title: TaskType["title"], todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }

    const changeTaskStatus = (taskId: TaskType['id'], isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasksState = {...tasks}
        delete tasks[todolistId]
        setTasks(copyTasksState)

    }

    const todolistComponents = todolists.map(tl => (
        <Todolist key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                  deleteTask={deleteTask}
                  changeTodolistFilter={changeTodolistFilter}
                  createTask={createTask}
                  changeTaskStatus={changeTaskStatus}
                  deleteTodolist={deleteTodolist}
        />
    ))

    return (
        <div className="app">
            {todolistComponents}
        </div>
    )
}

export default App
