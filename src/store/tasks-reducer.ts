import {TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, todoListID_1, todoListID_2} from "./todolists-reducer";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    newIsDoneValue: boolean
    todoListID: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todoListID: string
}

export type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT


let initialState = {
    [todoListID_1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false}
    ],
    [todoListID_2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Meat", isDone: true},
        {id: v1(), title: "Bread", isDone: false}
    ],
}
export type InitialTasksStateType = typeof initialState
export const tasksReducer = (state = initialState, action: ActionsType): InitialTasksStateType  => {
    switch (action.type){
        case "REMOVE-TASK":
            // let todoListTasks = state[action.todoListID]
            // state[action.todoListID] = todoListTasks.filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, isDone: action.newIsDoneValue} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId]: []
            }
        case "REMOVE-TODOLIST":
                let copyState = {...state}
                delete copyState[action.todoListID]
                return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT  => {
    return {type: 'REMOVE-TASK', taskId, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskAT => {
    return {type: 'ADD-TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskId: string, newIsDoneValue: boolean, todoListID: string): ChangeTaskStatusAT => {
    return  {type: 'CHANGE-TASK-STATUS', taskId, newIsDoneValue, todoListID}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListID: string): ChangeTaskTitleAT => {
    return  {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListID}
}

