import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors"
import { fetchTodolistTC } from "@/features/todolists/model/todolists-slice"
import { Todolist } from "@/features/todolists/ui/Todolists/Todolist/Todolist"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistTC())
  }, [])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper elevation={8} sx={{ p: "15px" }}>
            <Todolist todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
