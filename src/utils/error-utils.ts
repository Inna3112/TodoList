import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../store/app-reducer";
import {CommonResponseType} from "../dal/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error!'))
    dispatch(setAppStatusAC('failed'))
}