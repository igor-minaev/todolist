import {JSX} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = ({title, tasks}: PropsType) => {

    const tasksList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                </li>
            ))}
        </ul>
        : <span>Your tasksList is empty</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
