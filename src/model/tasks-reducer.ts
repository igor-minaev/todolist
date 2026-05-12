import {TasksStateType, TodolistType} from "../app/App.tsx";
import {createTodolistAC, CreateTodolistAT, deleteTodolistAC, DeleteTodolistAT} from "./todolists-reducer.ts";
import {TaskType} from "../types.ts";
import {createReducer, nanoid} from "@reduxjs/toolkit";

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
export type createTaskAT = ReturnType<typeof createTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    CreateTodolistAT
    | DeleteTodolistAT
    | DeleteTaskAT
    | createTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT

const initialState: TasksStateType = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
})

export const tasksReducer2 = (tasks: TasksStateType = initialState, action: ActionType) => {
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
                id: nanoid(),
                title: title,
                isDone: false
            }
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case "change_task_status": {
            const {taskId, isDone, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)}
        }
        case "change_task_title": {
            const {taskId, title, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)}
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

export const changeTaskTitleAC = (payload: {
    taskId: TaskType['id'],
    title: TaskType['title'],
    todolistId: string
}) => ({
    type: 'change_task_title',
    payload
} as const)