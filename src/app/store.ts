import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "@/features/todolists/model/tasks-reducer"
import { todolistsReducer } from "@/features/todolists/model/todolists-reducer"
import { appReducer } from "./app-slice"

// объединение reducer'ов с помощью combineReducers
const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

// создание store
export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
