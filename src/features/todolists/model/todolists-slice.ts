import { createAppSlice } from "@/common/utils/createAppSlice"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types"

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DomainTodolist = Todolist & { filter: FilterValuesType }

export type FilterValuesType = "all" | "active" | "completed"

export const toolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    fetchTodolistTC: create.asyncThunk(
      async (_arg, { rejectWithValue }) => {
        try {
          const res = await todolistsApi.getTodolists()
          return { todolists: res.data }
        } catch (e) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => state.push({ ...tl, filter: "all" }))
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { rejectWithValue }) => {
        try {
          const res = await todolistsApi.createTodolist(title)
          return { todolist: res.data.data.item }
        } catch (e) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all" })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        try {
          await todolistsApi.deleteTodolist(id)
          return { id }
        } catch (e) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (args: { id: string; title: string }, { rejectWithValue }) => {
        try {
          await todolistsApi.changeTodolistTitle(args)
          return args
        } catch (e) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload.id)
          if (index !== -1) state[index].title = action.payload.title
        },
      },
    ),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
  }),
})

export const { changeTodolistFilterAC, changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, fetchTodolistTC } =
  toolistsSlice.actions
export const todolistsReducer = toolistsSlice.reducer
export const { selectTodolists } = toolistsSlice.selectors
