import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistTC.fulfilled, (_state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
      })
      .addCase(fetchTodolistTC.rejected, (_state, _action) => {})
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all" })
      })
  },
  reducers: (create) => ({
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
  }),
})

export const fetchTodolistTC = createAsyncThunk(
  `${toolistsSlice.name}/fetchTodolistTC`,
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.getTodolists()
      return { todolists: res.data }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  `${toolistsSlice.name}/createTodolistTC`,
  async (title: string, { rejectWithValue }) => {
    try {
      const res = await todolistsApi.createTodolist(title)
      return { todolist: res.data.data.item }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC } = toolistsSlice.actions
export const todolistsReducer = toolistsSlice.reducer
