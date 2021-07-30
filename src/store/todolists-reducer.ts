import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../dal/todolist-api";
import {Dispatch} from "redux";


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
export const todoListsReducer = (todoLists = initialState, action: ActionsType): InitialTodoListsStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            // const newTodoListID = action.todoListId
            // const newTodoList: TodoListEntityType = {
            //     id: newTodoListID,
            //     title: action.title,
            //     filter: 'all',
            //     addedDate: '',
            //     order: 0}
            const newTodoList: TodoListEntityType = {...action.todoList, filter: 'all'}
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

//actions
export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID: todoListID} as const)
export const addTodoListAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodoListTitleAC = (newTitle: string, todoListID: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', newTitle, todoListID} as const)
export const changeFilterAC = (filter: FilterValuesType, todoListID: string) =>
    ({type: 'CHANGE-FILTER', filter, todoListID} as const)
export const setTodoListsAC = (todoLists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

//thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodo()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const removeTodoListTC = (todoListID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodo(todoListID)
        .then(res => {
            dispatch(removeTodoListAC(todoListID))
        })
}
export const addTooListTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const changeTodoListTitleTC = (todoTitle: string, todoID: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodo(todoID, todoTitle)
        .then(res => {
            dispatch(changeTodoListTitleAC(todoTitle, todoID))
        })
}

//types
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type SetTodoListAT = ReturnType<typeof setTodoListsAC>

export type ActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeFilterAC>
    | SetTodoListAT
