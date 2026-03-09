import {JSX} from "react";
import {Button} from "./Button.tsx";
import {FilterValuesType, TaskType} from "./types.ts";

type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
}


export const Todolist = ({title, tasks, deleteTask, changeTodolistFilter}: PropsType) => {

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
                <input/>
                <Button title="+"/>
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
