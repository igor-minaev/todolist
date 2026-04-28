import {TodolistType} from "../App.tsx";
import {FilterValuesType} from "../types.ts";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type  ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT


export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            const id = action.payload.id
            return todolists.filter(tl => tl.id !== id)
        }
        case 'create_todolist': {
            const newTodolistId = crypto.randomUUID()
            const title = action.payload.title
            const newTodolist: TodolistType = {
                id: newTodolistId,
                title,
                filter: 'all'
            }
            return [...todolists, newTodolist]
        }
        case 'change_todolist_title': {

            const {id, title} = action.payload
            return todolists.map(t => t.id === id ? {...t, title} : t)
        }
        case'change_todolist_filter': {
            const {id, filter} = action.payload
            return todolists.map(t => t.id === id ? {...t, filter} : t)
        }
        default:
            return todolists
    }
}


export const deleteTodolistAC = (id: TodolistType['id']) => ({
    type: 'delete_todolist',
    payload: {
        id
    }
} as const)

export const createTodolistAC = (title: TodolistType['title']) => ({
    type: 'create_todolist',
    payload: {
        title
    }
} as const)

export const changeTodolistTitleAC = (payload: { id: TodolistType['id'], title: TodolistType['title'] }) => ({
    type: 'change_todolist_title',
    payload
} as const)

export const changeTodolistFilterAC = (payload: { id: TodolistType['id'], filter: FilterValuesType }) => ({
    type: 'change_todolist_filter',
    payload
} as const)