import { createTheme } from "@mui/material"
import { amber, purple } from "@mui/material/colors"
import type { ThemeMode } from "@/app/app-slice"

export const getTheme = (themeMode: ThemeMode) =>
  createTheme({
    palette: {
      primary: purple,
      secondary: amber,
      mode: themeMode,
    },
  })
