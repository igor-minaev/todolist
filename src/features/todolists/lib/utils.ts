import { TaskStatus } from "@/common/enum/enum"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import type { FilterValuesType } from "@/features/todolists/model/todolists-slice"

export const getFilteredTasks = (tasks: DomainTask[], filter: FilterValuesType): DomainTask[] => {
  switch (filter) {
    case "active":
      return tasks.filter((t) => t.status === TaskStatus.New)
    case "completed":
      return tasks.filter((t) => t.status === TaskStatus.Completed)
    default:
      return tasks
  }
}
