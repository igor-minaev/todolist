import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";

function App() {
    // data
    const todolistTitle_1 = "What to learn"
    const todolistTitle_2 = "What to buy"
    const todolistTitle_3 = "What to read"

    const tasks_1: TaskType[] = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 10, title: "REDUX", isDone: false},
        {id: 11, title: "RTK", isDone: false},
    ]
    const tasks_2: TaskType[] = [
        {id: 4, title: "SALT", isDone: true},
        {id: 5, title: "BREAD", isDone: true},
        {id: 6, title: "WATER", isDone: false}
    ]


    return (
        <div className="app">
            <Todolist title={todolistTitle_1} tasks={tasks_1}/>
            {Todolist({title:todolistTitle_2, tasks:tasks_2})}
            <Todolist title={todolistTitle_3} tasks={[]}/>
        </div>
    )
}

export default App
