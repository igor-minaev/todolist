import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {type TodolistType} from "@/features/todolists/model/todolists-reducer";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {FilterButtons} from "./FilterButtons/FilterButtons";

type PropsType = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: PropsType) => {
    const dispatch = useAppDispatch()

    const createTaskHandler = (taskTitle: string) => dispatch(createTaskAC({title: taskTitle, id: todolist.id}))

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createTitle={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
        ;
};
