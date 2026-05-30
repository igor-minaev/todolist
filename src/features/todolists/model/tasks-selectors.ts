import {RootState} from "../../../app/store.ts";
import { TasksStateType } from "./tasks-reducer.ts";


export const selectTasks = (state: RootState): TasksStateType => state.tasks