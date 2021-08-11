import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {authAPI, LoginParamsType} from "../dal/todolist-api";
import {resultCodeType} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


let initialState = {
    isLoggedIn: false,
}


export const authReducer = (state = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === resultCodeType.success){
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


//types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppErrorActionType | SetAppStatusActionType

export type InitialAuthStateType = typeof initialState
