import {SxProps} from '@mui/material'

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    fontWeight: isDone ? 'normal' : 'bold',
    fontStyle: isDone ? 'italic' : 'none',
    textDecoration: isDone ? 'line-through' : 'none',
    opacity: isDone ? "0.5" : "1"
})

