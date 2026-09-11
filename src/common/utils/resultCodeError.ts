import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"

export const resultCodeError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  const error = data.messages ? data.messages[0] : "Something went wrong"
  dispatch(setAppErrorAC({ error }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
