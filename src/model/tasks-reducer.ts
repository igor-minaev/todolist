import {TasksStateType, TodolistType} from "../App.tsx";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {TaskType} from "../types.ts";
import {v1} from "uuid";

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type createTaskAT = ReturnType<typeof createTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

type ActionType = CreateTodolistAT | DeleteTodolistAT | DeleteTaskAT | createTaskAT | changeTaskStatusAT

export const tasksReducer = (tasks: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'delete_todolist':
            const copyTasksState = {...tasks}
            delete copyTasksState[action.payload.id]
            return copyTasksState
        case "create_todolist":
            return {...tasks, [action.payload.id]: []}
        case 'delete_task': {
            const {taskId, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        }
        case 'create_task': {
            const {title, todolistId} = action.payload
            const newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            }
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case "change_task_status": {
            const {taskId, isDone, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)}
        }
        default:
            return tasks
    }
}

export const deleteTaskAC = (payload: { taskId: TaskType["id"], todolistId: TodolistType['id'] }) => ({
    type: 'delete_task',
    payload
} as const)

export const createTaskAC = (payload: { title: TaskType['title'], todolistId: TodolistType['id'] }) => ({
    type: 'create_task',
    payload
} as const)

export const changeTaskStatusAC = (payload: {
    taskId: TaskType['id'],
    isDone: TaskType['isDone'],
    todolistId: string
}) => ({
    type: 'change_task_status',
    payload
} as const)