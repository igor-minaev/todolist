import List from "@mui/material/List";
import {ChangeEvent} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer";
import ListItem from "@mui/material/ListItem";
import {containerSx, getListItemSx} from "@/Todolist.style";
import {Box} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/EditableSpan";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/model/tasks-selectors";
import {getFilteredTasks} from "@/utils";
import type {TodolistType} from "@/model/todolists-reducer";

type PropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: PropsType) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = getFilteredTasks(tasks[id], filter)

    const dispatch = useAppDispatch()

    return (
        <>
            {tasks.length === 0
                    ? (<span>Your tasksList is empty</span>)
                    : (<List>
                        {todolistTasks.map(task => {
                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC({
                                taskId: task.id,
                                isDone: e.currentTarget.checked,
                                id
                            }))
                            const changeTaskTitleHandler = (title: string) => dispatch(changeTaskTitleAC({
                                taskId: task.id,
                                title,
                                id
                            }))

                            const deleteTaskHandler = () => dispatch(deleteTaskAC({taskId: task.id, id}))


                            return (
                                <ListItem disablePadding key={task.id} sx={containerSx}>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox size="medium" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                                        <Box sx={getListItemSx(task.isDone)}>
                                            <EditableSpan title={task.title}
                                                          editeItemTitle={changeTaskTitleHandler}
                                            />
                                        </Box>
                                    </Box>
                                    <IconButton onClick={deleteTaskHandler}>
                                        <HighlightOffIcon/>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>)
            }
        </>
    )
}