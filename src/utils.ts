import type {TaskType} from "@/model/tasks-reducer";
import type {FilterValuesType} from "@/model/todolists-reducer";


export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    switch (filter) {
        case "active":
            return tasks.filter(t => !t.isDone)
        case "completed":
            return tasks.filter(t => t.isDone)
        default:
            return tasks
    }
}