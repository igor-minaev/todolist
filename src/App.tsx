import './App.css'
import {Todolist} from "./Todolist.tsx";
import {useRef, useState} from "react";
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
        // tasksNumber.current += 1
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
            <Todolist
                // tasksNumber={tasksNumber.current}
                title={todolistTitle}
                tasks={getFilteredTasks(tasks, filter)}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                createTask={createTask}/>
        </div>
    )
}

export default App
