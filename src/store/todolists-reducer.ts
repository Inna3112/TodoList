import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../dal/todolist-api";
import {Dispatch} from "redux";

 export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
 export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
     todoListId: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todoListID: string
}
type ChangeFilterAT = {
    type: 'CHANGE-FILTER'
    filter: FilterValuesType
    todoListID: string
}
export type SetTodoListsAT = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodolistType>
}
export type ActionsType = RemoveTodoListAT | AddTodoListAT
    | ChangeTodoListTitleAT | ChangeFilterAT | SetTodoListsAT

export const todoListID_1 = v1()
export const todoListID_2 = v1()
let initialState: Array<TodoListEntityType> = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 1},
    // {id: todoListID_2, title: 'What to bue', filter: 'all', addedDate: '', order: 1}
]
export type InitialTodoListsStateType = typeof initialState
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListEntityType = TodolistType & {
     filter: FilterValuesType
}
export const todoListsReducer = (todoLists = initialState, action: ActionsType):InitialTodoListsStateType => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = action.todoListId
            const newTodoList: TodoListEntityType = {id: newTodoListID, title: action.title, filter: 'all', addedDate: '', order: 0}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle} : tl)
        case "CHANGE-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => {
                return {...tl, filter: 'all'}
            })
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID: todoListID}
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title, todoListId: v1()}
}
export const changeTodoListTitleAC = (newTitle: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, todoListID}
}
export const changeFilterAC = (filter: FilterValuesType, todoListID: string): ChangeFilterAT => {
    return {type: 'CHANGE-FILTER', filter, todoListID}
}
export const setTodoListsAC = (todoLists: Array<TodolistType>): SetTodoListsAT => {
     return {
         type: 'SET-TODOLISTS', todoLists
     }
}

export const fetchTodoListsTC = () => {
     return (dispatch: Dispatch) => {
         todolistAPI.getTodo()
             .then(res => {
                 dispatch(setTodoListsAC(res.data))
             })
     }
}

