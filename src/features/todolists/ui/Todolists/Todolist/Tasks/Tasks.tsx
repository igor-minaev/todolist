import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { getFilteredTasks } from "@/features/todolists/lib/utils"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice"

import type { DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { Task } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task"
import List from "@mui/material/List"
import { useEffect } from "react"

type PropsType = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: PropsType) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const todolistTasks = getFilteredTasks(tasks[id], filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  return (
    <>
      {todolistTasks?.length === 0 ? (
        <span>Your tasksList is empty</span>
      ) : (
        <List>
          {todolistTasks?.map((task) => {
            return <Task key={task.id} task={task} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}
