import { RootState } from "@/app/store"
import type { TodolistType } from "@/features/todolists/model/todolists-slice"

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists
