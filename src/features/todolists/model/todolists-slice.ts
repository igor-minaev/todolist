import { setAppStatusAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enum/enum"
import type { RequestStatus } from "@/common/types"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { catchError } from "@/common/utils/errorCatch"
import { resultCodeError } from "@/common/utils/resultCodeError"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export type FilterValuesType = "all" | "active" | "completed"

export const toolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    fetchTodolistTC: create.asyncThunk(
      async (_arg, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (e) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => state.push({ ...tl, filter: "all", entityStatus: "idle" }))
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolist: res.data.data.item }
          } else {
            resultCodeError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          catchError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (id: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
          const res = await todolistsApi.deleteTodolist(id)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { id }
          } else {
            resultCodeError(res.data, dispatch)
            dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "failed" }))
            return rejectWithValue(null)
          }
        } catch (error) {
          catchError(error, dispatch)
          dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "failed" }))
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
      async (args: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistsApi.changeTodolistTitle(args)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return args
          } else {
            resultCodeError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          catchError(error, dispatch)
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
    changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) todolist.entityStatus = action.payload.entityStatus
    }),
  }),
})

export const {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistTC,
  changeTodolistEntityStatusAC,
} = toolistsSlice.actions
export const todolistsReducer = toolistsSlice.reducer
export const { selectTodolists } = toolistsSlice.selectors
