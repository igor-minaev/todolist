import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')

export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValuesType
}>('todolists/changeTodolistFilter')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})


const initialState: TodolistType[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const index = state.find(todo => todo.id === action.payload.id)
            if (index) index.filter = action.payload.filter
        })
        .addCase(createTodolistAC, (state, action) => {
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            state.push(newTodolist)
        })

})

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"








