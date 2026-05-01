import {TasksStateType} from "../App.tsx";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {TaskType} from "../types.ts";

export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>

type ActionType = CreateTodolistAT | DeleteTodolistAT | DeleteTaskAT

export const tasksReducer = (tasks: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'delete_todolist':
            const copyTasksState = {...tasks}
            delete copyTasksState[action.payload.id]
            return copyTasksState
        case "create_todolist":
            return {...tasks, [action.payload.id]: []}
        case 'delete_task':
            const {taskId, todolistId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        default:
            return tasks
    }
}

export const deleteTaskAC = (payload: { taskId: TaskType["id"], todolistId: string }) => ({
    type: 'delete_task',
    payload
} as const)