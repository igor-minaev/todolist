import type { TaskType } from "@/features/todolists/model/tasks-slice"
import type { FilterValuesType } from "@/features/todolists/model/todolists-slice"

export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
  switch (filter) {
    case "active":
      return tasks.filter((t) => !t.isDone)
    case "completed":
      return tasks.filter((t) => t.isDone)
    default:
      return tasks
  }
}
