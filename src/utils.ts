import {FilterValuesType, TaskType} from "./types.ts";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {

    // let filteredTasks = tasks
    // if (filter === "active") {
    //     filteredTasks = tasks.filter(t => !t.isDone)
    // }
    // if (filter === "completed") {
    //     filteredTasks = tasks.filter(t => t.isDone)
    // }
    // return filteredTasks


    // return filter === "active"
    //     ? tasks.filter(t => !t.isDone)
    //     : filter === "completed"
    //         ? tasks.filter(t => t.isDone)
    //         : tasks

    switch (filter) {
        case "active":
            return tasks.filter(t => !t.isDone)
        case "completed":
            return tasks.filter(t => t.isDone)
        default:
            return tasks
    }
}