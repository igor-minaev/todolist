import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackBar } from "@/common/components"
import styles from "./App.module.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { Header } from "@/common/components/Header/Header"
import { getTheme } from "@/common/theme"
import { Main } from "@/app/Main"

function App() {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
      <ErrorSnackBar />
    </div>
  )
}

export default App
