import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DomainTodolist = Todolist & { filter: FilterValuesType }

export type FilterValuesType = "all" | "active" | "completed"

export const toolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    fetchTodolistAC: create.reducer<{ todolists: Todolist[] }>((_state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }),
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        const newTodolist: DomainTodolist = {
          id: action.payload.id,
          title: action.payload.title,
          filter: "all",
          addedDate: "",
          order: 1,
        }
        state.push(newTodolist)
      },
    ),
  }),
})

export const fetchTodolistTC = createAsyncThunk(`${toolistsSlice.name}/fetchTodolistTC`, (_arg, { dispatch }) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(fetchTodolistAC({ todolists: res.data }))
  })
})

export const { deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, fetchTodolistAC } =
  toolistsSlice.actions
export const todolistsReducer = toolistsSlice.reducer
