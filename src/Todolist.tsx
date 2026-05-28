import {CreateItemForm} from "./CreateItemForm.tsx";
import {createTaskAC} from "@/model/tasks-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {type TodolistType} from "@/model/todolists-reducer";
import {TodolistTitle} from "@/TodolistTitle";
import {Tasks} from "@/Tasks";
import {FilterButtons} from "@/FilterButtons";

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
