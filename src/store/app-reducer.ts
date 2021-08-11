import {Dispatch} from "redux";
import {authAPI} from "../dal/todolist-api";
import {resultCodeType} from "./todolists-reducer";
import {setIsLoggedInAC} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

let initialAppState: InitialAppStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: ActionType): InitialAppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitialized = (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED', isInitialized} as const)
//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
        if (res.data.resultCode === resultCodeType.success) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitialized(true))
        })
}


//types
export type InitialAppStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    //если произойдет какая-то глобальная ошибка - мы запишем ее сюда
    error: string | null
    //проинициализировалось ли все приложение
    isInitialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setIsInitialized>

export type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'