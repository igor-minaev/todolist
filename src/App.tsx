import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";

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


    return (
        <div className="app">
            <Todolist title={todolistTitle} tasks={tasks}/>
        </div>
    )
}

export default App
