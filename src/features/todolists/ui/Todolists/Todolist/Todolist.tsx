import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
import { createTaskAC } from "@/features/todolists/model/tasks-slice"
import { type DomainTodolist } from "@/features/todolists/model/todolists-slice"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type PropsType = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: PropsType) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (taskTitle: string) => dispatch(createTaskAC({ title: taskTitle, id: todolist.id }))

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm createTitle={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
