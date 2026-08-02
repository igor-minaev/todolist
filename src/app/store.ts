import { tasksReducer } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer } from "@/features/todolists/model/todolists-slice"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./app-slice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
