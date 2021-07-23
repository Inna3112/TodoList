import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, todoListID_1, todoListID_2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../dal/todolist-api";

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
    newStatus: TaskStatuses
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
            {id: v1(), title: "HTML", status: TaskStatuses.Completed,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "CSS", status: TaskStatuses.Completed,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Meat", status: TaskStatuses.Completed,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Bread", status: TaskStatuses.New,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''}
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
                status: TaskStatuses.New,
                deadline: '',
                description: '',
                priority: 0,
                addedDate: '',
                startDate: '',
                todoListId: action.todoListID,
                order: 0
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, status: action.newStatus} : t)
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
export const changeTaskStatusAC = (taskId: string, newStatus: TaskStatuses, todoListID: string): ChangeTaskStatusAT => {
    return  {type: 'CHANGE-TASK-STATUS', taskId, newStatus, todoListID}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListID: string): ChangeTaskTitleAT => {
    return  {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListID}
}

