import {EditableSpan} from "@/EditableSpan";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Typography} from "@mui/material";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTodolistTitleAC, deleteTodolistAC, type TodolistType} from "@/model/todolists-reducer";

type PropsType = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: PropsType) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const changeTodolistTitleHandler = (title: string) => dispatch(changeTodolistTitleAC({id, title}))

    const deleteTodolistHandler = () => dispatch(deleteTodolistAC({id}))

    return(
        <Typography align='center' variant="h5" sx={{fontWeight: 'bold'}}>
            <EditableSpan title={title} editeItemTitle={changeTodolistTitleHandler}/>
            <IconButton onClick={deleteTodolistHandler}>
                <HighlightOffIcon/>
            </IconButton>
        </Typography>
    )
}