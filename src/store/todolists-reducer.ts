import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
type addTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}
type changeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todoListID: string
}
type changeFilterAT = {
    type: 'CHANGE-FILTER'
    filter: FilterValuesType
    todoListID: string
}
export type ActionsType = RemoveTodoListAT | addTodoListAT | changeTodoListTitleAT | changeFilterAT

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionsType):Array<TodoListType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle} : tl)
        case "CHANGE-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID: todoListID}
}
export const AddTodoListAC = (title: string): addTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodoListTitleAC = (newTitle: string, todoListID: string): changeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', newTitle, todoListID}
}
export const changeFilterAC = (filter: FilterValuesType, todoListID: string): changeFilterAT => {
    return {type: 'CHANGE-FILTER', filter, todoListID}
}

