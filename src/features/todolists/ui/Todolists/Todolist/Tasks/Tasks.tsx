import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/features/todolists/model/tasks-selectors";
import {getFilteredTasks} from "@/features/todolists/lib/utils";
import type {TodolistType} from "@/features/todolists/model/todolists-reducer";
import {Task} from "@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task";

type PropsType = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: PropsType) => {
    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const todolistTasks = getFilteredTasks(tasks[id], filter)

    return (
        <>
            {todolistTasks.length === 0
                ? (<span>Your tasksList is empty</span>)
                : (<List>
                    {todolistTasks.map(task => {

                        return (
                            <Task key={task.id} task={task} todolistId={id}/>
                        )
                    })}
                </List>)
            }
        </>
    )
}