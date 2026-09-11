import { selectError, setAppErrorAC } from "@/app/app-slice"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import Alert from "@mui/material/Alert"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import { type SyntheticEvent } from "react"

export const ErrorSnackBar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppErrorAC({ error: null }))
  }

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
