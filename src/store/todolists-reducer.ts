import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {
    RequestStatusType, SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "./app-reducer";
import {TaskActionsType} from "./tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export const todoListID_1 = v1()
export const todoListID_2 = v1()
let initialState: Array<TodoListEntityType> = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 1},
    // {id: todoListID_2, title: 'What to bue', filter: 'all', addedDate: '', order: 1}
]

export const todoListsReducer = (todoLists = initialState, action: TodolistActionsType): InitialTodoListsStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, entityStatus: action.entityStatus} : tl)
        case "CHANGE-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return todoLists
    }
}

//actions
export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID: todoListID} as const)
export const addTodoListAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodoListTitleAC = (newTitle: string, todoListID: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', newTitle, todoListID} as const)
export const changeFilterAC = (filter: FilterValuesType, todoListID: string) =>
    ({type: 'CHANGE-FILTER', filter, todoListID} as const)
export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todoLists} as const)
export const changeTodoListEntityStatusAC = (todoListID: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoListID, entityStatus} as const)

//thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodo()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC('successed'))
        })
}
export const removeTodoListTC = (todoListID: string) => (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListID, 'loading'))
    todolistAPI.deleteTodo(todoListID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListID))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTooListTC = (title: string) => (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('successed'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodoListTitleTC = (todoTitle: string, todoID: string) => (dispatch: Dispatch<ThunkDispatch>) => {
    todolistAPI.updateTodo(todoID, todoTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoTitle, todoID))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
    export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
    export type AddTodoListAT = ReturnType<typeof addTodoListAC>
    export type SetTodoListAT = ReturnType<typeof setTodoListsAC>

    export type TodolistActionsType = RemoveTodoListAT
        | AddTodoListAT
        | ReturnType<typeof changeTodoListTitleAC>
        | ReturnType<typeof changeFilterAC>
        | SetTodoListAT
        | ReturnType<typeof changeTodoListEntityStatusAC>
    type ThunkDispatch = TodolistActionsType | SetAppErrorActionType | SetAppStatusActionType

    export type InitialTodoListsStateType = typeof initialState
    export type FilterValuesType = "all" | "active" | "completed"
    export type TodoListEntityType = TodolistType & {
        filter: FilterValuesType,
        entityStatus: RequestStatusType,
    }