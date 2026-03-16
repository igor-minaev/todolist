import {JSX, useRef} from "react";
import {Button} from "./Button.tsx";
import {FilterValuesType, TaskType} from "./types.ts";

type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    createTask: (title: TaskType["title"]) => void
    // tasksNumber: number
}


export const Todolist = ({title, tasks, deleteTask, changeTodolistFilter, createTask}: PropsType) => {

    const taskInputRef = useRef<HTMLInputElement>(null)

    const tasksList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                    <Button title="x" onClick={() => deleteTask(task.id)}/>
                </li>
            ))}
        </ul>
        : <span>Your tasksList is empty</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={taskInputRef}/>
                <Button title="+" onClick={() => {
                    if (taskInputRef.current) {
                        createTask(taskInputRef.current.value)
                        taskInputRef.current.value = ""
                    }
                }}/>
                {/*<button>+</button>*/}
            </div>
            {tasksList}
            <div>
                <Button title="All" onClick={() => changeTodolistFilter("all")}/>
                <Button title="Active" onClick={() => changeTodolistFilter("active")}/>
                <Button title="Completed" onClick={() => changeTodolistFilter("completed")}/>
                {/*<button>All</button>*/}
                {/*<button>Active</button>*/}
                {/*<button>Completed</button>*/}
            </div>
        </div>
    );
};
