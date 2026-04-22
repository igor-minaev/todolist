import {ChangeEvent, JSX} from "react";
// import {Button} from "./Button.tsx";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {FilterValuesType, TaskType} from "./types.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {TodolistType} from "./App.tsx";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import {Box, Typography} from "@mui/material";
import {containerSx, getListItemSx} from "./Todolist.style.ts";

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"], todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    createTask: (title: TaskType["title"], todolistId: string) => void
    changeTaskStatus: (taskId: TaskType['id'], isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: TodolistType['title'], todolistId: string) => void
    changeTaskTitle: (taskId: TaskType['id'], title: TaskType['title'], todolistId: string) => void
}


export const Todolist = ({
                             id,
                             title,
                             filter,
                             tasks,
                             deleteTask,
                             changeTodolistFilter,
                             createTask,
                             changeTaskStatus,
                             deleteTodolist,
                             changeTodolistTitle,
                             changeTaskTitle
                         }: PropsType) => {

    const tasksList: JSX.Element = tasks.length
        ? <List>
            {tasks.map(task => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id)
                const changeTaskTitleHandler = (title: string) => changeTaskTitle(task.id, title, id)
                return (
                    <ListItem disablePadding key={task.id} sx={containerSx}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Checkbox size="medium" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                            <Box sx={getListItemSx(task.isDone)}>
                                <EditableSpan title={task.title}
                                              editeItemTitle={changeTaskTitleHandler}
                                    // spanClassName={task.isDone ? "task-done" : "task"}
                                />
                            </Box>
                        </Box>
                        <IconButton onClick={() => deleteTask(task.id, id)}>
                            <HighlightOffIcon/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>
        : <span>Your tasksList is empty</span>

    const createTaskHandler = (taskTitle: TaskType['title']) => createTask(taskTitle, id)

    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title, id)

    return (
        <div>
            <Typography align='center' variant="h5" sx={{fontWeight: 'bold'}}>
                <EditableSpan title={title} editeItemTitle={changeTodolistTitleHandler}/>
                <IconButton onClick={() => deleteTodolist(id)}>
                    <HighlightOffIcon/>
                </IconButton>
            </Typography>
            <CreateItemForm createTitle={createTaskHandler}/>
            {
                tasksList
            }
            <Box sx={containerSx}>
                <Button size='small' variant="contained" color={filter === "all" ? "secondary" : "primary"} onClick={() => changeTodolistFilter("all", id)}>All</Button>
                <Button size='small' variant="contained" color={filter === "active" ? "secondary" : "primary"} onClick={() => changeTodolistFilter("active", id)}>Active</Button>
                <Button size='small' variant="contained" color={filter === "completed" ? "secondary" : "primary"} onClick={() => changeTodolistFilter("completed", id)}>Completed</Button>
            </Box>
        </div>
    )
        ;
};
