import {ChangeEvent, JSX} from "react";
import {Button} from "./Button.tsx";
import {FilterValuesType, TaskType} from "./types.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {TodolistType} from "./App.tsx";

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
    changeTodolistTitle: (title: TodolistType['title'], todolistId: string) => void
    changeTaskTitle: (taskId: TaskType['id'], title: TaskType['title'], todolistId: string) => void
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
                             deleteTodolist,
                             changeTodolistTitle,
                             changeTaskTitle
                         }: PropsType) => {

    const tasksList: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id)
                const changeTaskTitleHandler = (title: string) => changeTaskTitle(task.id, title, id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                        <EditableSpan title={task.title} editeItemTitle={changeTaskTitleHandler} spanClassName={task.isDone ? "task-done" : "task"}/>
                        <Button title="x" onClick={() => deleteTask(task.id, id)}/>
                    </li>
                )
            })}
        </ul>
        : <span>Your tasksList is empty</span>

    const createTaskHandler = (taskTitle: TaskType['title']) => createTask(taskTitle, id)

    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title, id)

    return (
        <div>
            <h3>
                <EditableSpan title={title} editeItemTitle={changeTodolistTitleHandler}/>
                <Button title="x" onClick={() => deleteTodolist(id)}/>
            </h3>
            <CreateItemForm createTitle={createTaskHandler}/>
            {
                tasksList
            }
            <div>
                <Button className={filter === "all" ? "btn-filter-active" : ""} title="All" onClick={() => changeTodolistFilter("all", id)}/>
                <Button className={filter === "active" ? "btn-filter-active" : ""} title="Active" onClick={() => changeTodolistFilter("active", id)}/>
                <Button className={filter === "completed" ? "btn-filter-active" : ""} title="Completed" onClick={() => changeTodolistFilter("completed", id)}/>
            </div>
        </div>
    )
        ;
};
