import {ChangeEvent, JSX, useState} from "react";
import {Button} from "./Button.tsx";
import {FilterValuesType, TaskType} from "./types.ts";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"], todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    createTask: (title: TaskType["title"], todolistId: string) => void
    changeTaskStatus: (taskId: TaskType['id'], isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
}


export const Todolist = ({
                             id,
                             title,
                             filter,
                             tasks,
                             deleteTask,
                             changeTodolistFilter,
                             createTask,
                             changeTaskStatus,
                             deleteTodolist
                         }: PropsType) => {

    const [taskInputValue, setTaskInputValue] = useState('')
    const [error, setError] = useState(false)
    const minTaskTitleLength = 3
    const maxTaskTitleLength = 15


    const tasksList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button title="x" onClick={() => deleteTask(task.id, id)}/>
                    </li>
                )
            })}
        </ul>
        : <span>Your tasksList is empty</span>

    const setTaskTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskInputValue(e.currentTarget.value)
    }
    const createTaskHandler = () => {
        const trimmedTaskTitle = taskInputValue.trim()
        if (trimmedTaskTitle === '') {
            setError(true)
        } else {
            createTask(taskInputValue, id)
        }
        setTaskInputValue('')
    }


    const isTaskTitleLengthNotValid = taskInputValue.length < minTaskTitleLength || taskInputValue.length > maxTaskTitleLength

    return (
        <div>
            <h3>
                {title}
                <Button title="x" onClick={() => deleteTodolist(id)}/>
            </h3>
            <div>
                <input
                    className={error ? "task-input-error" : ""}
                    value={taskInputValue}
                    onChange={setTaskTitleInputHandler}
                    onKeyDown={(e) => {
                        e.key === "Enter" && !isTaskTitleLengthNotValid && createTaskHandler()
                    }}
                />
                <Button disabled={isTaskTitleLengthNotValid}
                        title="+" onClick={createTaskHandler}/>
                {error && <div style={{color: "red"}}>enter valid title</div>}
                {/*<button>+</button>*/}
                {error || taskInputValue.length < minTaskTitleLength &&
                    <p>min title length is {minTaskTitleLength} chars</p>}
                {taskInputValue.length >= minTaskTitleLength && taskInputValue.length <= maxTaskTitleLength &&
                    < p> max title length is {maxTaskTitleLength} chars</p>}
                {taskInputValue.length > maxTaskTitleLength && <p style={{color: "red"}}>max title is too long
                </p>
                }
            </div>
            {
                tasksList
            }
            <div>
                <Button className={filter === "all" ? "btn-filter-active" : ""} title="All" onClick={() => changeTodolistFilter("all", id)}/>
                <Button className={filter === "active" ? "btn-filter-active" : ""} title="Active" onClick={() => changeTodolistFilter("active", id)}/>
                <Button className={filter === "completed" ? "btn-filter-active" : ""} title="Completed" onClick={() => changeTodolistFilter("completed", id)}/>
                {/*<button>All</button>*/}
                {/*<button>Active</button>*/}
                {/*<button>Completed</button>*/}
            </div>
        </div>
    )
        ;
};
