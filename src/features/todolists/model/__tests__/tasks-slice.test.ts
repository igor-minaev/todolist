import { TaskPriority, TaskStatus } from "@/common/enum/enum.ts"
import { beforeEach, expect, test } from "vitest"
import { DomainTask } from "../../api/tasksApi.types.ts"
import { createTaskTC, deleteTaskTC, tasksReducer, type TasksStateType, updateTaskTC } from "../tasks-slice.ts"
import { createTodolistTC, deleteTodolistTC } from "../todolists-slice.ts"

let startState: TasksStateType = {}
const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("array should be created for new todolist", () => {
  const newTodolistId = "todolistId3"
  const endState = tasksReducer(
    startState,
    createTodolistTC.fulfilled(
      {
        todolist: {
          id: newTodolistId,
          title: "New todolist",
          addedDate: "",
          order: 0,
        },
      },
      "requestId",
      "New todolist",
    ),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
  expect(endState["todolistId1"]).toBeDefined()
  expect(endState["todolistId2"]).toBeDefined()
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: "todolistId2" }, "requestId", "todolistId2"),
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "requestId", {
      todolistId: "todolistId2",
      taskId: "2",
    }),
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    createTaskTC.fulfilled(
      {
        task: {
          id: "",
          title: "juice",
          status: TaskStatus.New,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
      },
      "requestId",
      {
        todolistId: "todolistId2",
        title: "juice",
      },
    ),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("juice")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const task: DomainTask = {
    id: "2",
    todoListId: "todolistId2",
    title: "coconut milk",
    description: "",
    status: TaskStatus.Completed,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    order: 0,
    addedDate: "",
  }
  const endState = tasksReducer(startState, updateTaskTC.fulfilled({ task }, "requestId", task))

  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[1].status).toBe(TaskStatus.Completed)
})

test("correct task should change its title", () => {
  const task: DomainTask = {
    id: "2",
    todoListId: "todolistId2",
    title: "coconut milk",
    description: "",
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    startDate: "",
    deadline: "",
    order: 0,
    addedDate: "",
  }
  const endState = tasksReducer(startState, updateTaskTC.fulfilled({ task }, "requestId", task))

  expect(endState.todolistId2.length).toBe(3)
  expect(endState.todolistId2[1].title).toBe("coconut milk")
})
