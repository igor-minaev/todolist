import {TasksStateType} from "../app/App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


export const deleteTaskAC = createAction<{ id: string, taskId: string }>('tasks/deleteTask')

export const createTaskAC = createAction<{ id: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{
    id: string, taskId: string, isDone: boolean
}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{ id: string, taskId: string, title: string }>('tasks/changeTaskTitle')


const initialState: TasksStateType = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.id]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const tasks = state[action.payload.id]
            tasks.unshift({
                id: nanoid(),
                title: action.payload.title,
                isDone: false
            })
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.id]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.id]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        })
})