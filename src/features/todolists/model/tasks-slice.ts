import { setAppStatusAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enum/enum"
import { createAppSlice } from "@/common/utils/createAppSlice"
import { catchError } from "@/common/utils/errorCatch"
import { resultCodeError } from "@/common/utils/resultCodeError"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import type { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"

export type TasksStateType = {
  [todolistId: string]: DomainTask[]
}

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (e) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (arg: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          const res = await tasksApi.deleteTask(arg)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return arg
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
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (arg: { title: string; todolistId: string }, { dispatch, rejectWithValue }) => {
        try {
          const res = await tasksApi.createTask(arg)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
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
          state[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (task: DomainTask, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          }
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { task: res.data.data.item }
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
          const tasks = state[action.payload.task.todoListId]
          const index = tasks.findIndex((t) => t.id === action.payload.task.id)
          if (index !== -1) tasks[index] = action.payload.task
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
  },
})

export const { deleteTaskTC, createTaskTC, fetchTasksTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
