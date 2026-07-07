import { RootState } from "./store"
import type { ThemeMode } from "./app-slice"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
