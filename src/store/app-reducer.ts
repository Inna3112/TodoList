let initialAppState: InitialAppStateType = {
    status: 'idle',
    error: 'some erorrrr',
}

export const appReducer = (state: InitialAppStateType = initialAppState, action: ActionType): InitialAppStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}

        default:
            return state
    }
}

//actions
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

//thunks


//types
export type InitialAppStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    //если произойдет какая-то глобальная ошибка - мы запишем ее сюда
    error: string | null
}
type ActionType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>
export type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'