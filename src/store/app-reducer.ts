
type InitialAppStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: 'idle' | 'loading' | 'successed' | 'failed'
    //если произойдет какая-то глобальная ошибка - мы запишем ее сюда
    error: string | null
}
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
export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID: todoListID} as const)

//thunks


//types

type ActionType = any