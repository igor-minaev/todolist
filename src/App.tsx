import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {getFilteredTasks} from "./utils.ts";
import {FilterValuesType, TaskType} from "./types.ts";



function App() {
    // data
    const todolistTitle = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 10, title: "REDUX", isDone: false},
        {id: 11, title: "RTK", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const deleteTask = (taskId: TaskType["id"]) => {
        const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // const getFilteredTasks = () => {
    //     let filteredTasks = tasks
    //     if (filter === "active") {
    //         filteredTasks = tasks.filter(t => !t.isDone)
    //     }
    //     if (filter === "completed") {
    //         filteredTasks = tasks.filter(t => t.isDone)
    //     }
    //     return filteredTasks
    // }


    return (
        <div className="app">
            <Todolist title={todolistTitle} tasks={getFilteredTasks(tasks, filter)} deleteTask={deleteTask} changeTodolistFilter={changeTodolistFilter}/>
        </div>
    )
}

export default App
