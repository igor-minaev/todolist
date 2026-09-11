import type { RequestStatus } from "@/common/types"
import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "light" | "dark"
export type Error = null | string

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as Error,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: Error }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const { selectThemeMode, selectStatus, selectError } = appSlice.selectors
