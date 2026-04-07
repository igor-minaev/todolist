import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./utils.ts";
import {FilterValuesType, TaskType} from "./types.ts";
import {v1} from "uuid";


function App() {
    // const tasksNumber = useRef<number>(3)
    // data
    const todolistTitle = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "REDUX", isDone: false},
        {id: v1(), title: "RTK", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const deleteTask = (taskId: TaskType["id"]) => {
        const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const createTask = (title: TaskType["title"]) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: TaskType[] = [...tasks, newTask]
        setTasks(nextState)
    }

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskId: TaskType['id'], isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }


    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                filter={filter}
                tasks={getFilteredTasks(tasks, filter)}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    )
}

export default App
