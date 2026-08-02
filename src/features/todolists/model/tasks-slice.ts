import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice"

export type TasksStateType = {
  [todolistId: string]: TaskType[]
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ id: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.id]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const tasks = state[action.payload.id]
      tasks.unshift({
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      })
    }),
    changeTaskStatusAC: create.reducer<{ id: string; taskId: string; isDone: boolean }>((state, action) => {
      const tasks = state[action.payload.id]
      const task = tasks.find((task) => task.id === action.payload.taskId)
      if (task) task.isDone = action.payload.isDone
    }),
    changeTaskTitleAC: create.reducer<{ id: string; taskId: string; title: string }>((state, action) => {
      const tasks = state[action.payload.id]
      const task = tasks.find((task) => task.id === action.payload.taskId)
      if (task) task.title = action.payload.title
    }),
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

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
