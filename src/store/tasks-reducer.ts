import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT, todoListID_1, todoListID_2} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModel} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
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
type UpdateTaskAT = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    todoListID: string
}
type SetTasksAT = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListID: string
}

export type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListsAT
    | SetTasksAT


let initialState = {
    [todoListID_1]: [
        {
            id: v1(), title: "HTML", status: TaskStatuses.Completed,
            todoListId: todoListID_1, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        },
        {
            id: v1(), title: "CSS", status: TaskStatuses.Completed,
            todoListId: todoListID_1, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.New,
            todoListId: todoListID_1, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        }
    ],
    [todoListID_2]: [
        {
            id: v1(), title: "Milk", status: TaskStatuses.Completed,
            todoListId: todoListID_2, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        },
        {
            id: v1(), title: "Meat", status: TaskStatuses.Completed,
            todoListId: todoListID_2, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        },
        {
            id: v1(), title: "Bread", status: TaskStatuses.New,
            todoListId: todoListID_2, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        }
    ],
}
export type InitialTasksStateType = typeof initialState
export const tasksReducer = (state = initialState, action: ActionsType): InitialTasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            // let todoListTasks = state[action.todoListID]
            // state[action.todoListID] = todoListTasks.filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     deadline: '',
            //     description: '',
            //     priority: 0,
            //     addedDate: '',
            //     startDate: '',
            //     todoListId: action.todoListID,
            //     order: 0
            // }
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        // case "CHANGE-TASK-STATUS":
        //     return {
        //         ...state,
        //         [action.todoListID]: state[action.todoListID]
        //             .map(t => t.id === action.taskId ? {...t, status: action.newStatus} : t)
        //     }
        // case "CHANGE-TASK-TITLE":
        //     return {
        //         ...state,
        //         [action.todoListID]: state[action.todoListID]
        //             .map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
        //     }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoList.id]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            let copyState = {...state}
            copyState[action.todoListID] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todoListID}
}
export const addTaskAC = (task: TaskType): AddTaskAT => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, newStatus: TaskStatuses, todoListID: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId, newStatus, todoListID}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListID}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListID: string): UpdateTaskAT => {
    return {type: 'UPDATE-TASK', taskId, model, todoListID}
}
export const setTasksAC = (todoListID: string, tasks: Array<TaskType>): SetTasksAT => {
    return {type: 'SET-TASKS', todoListID, tasks}
}

export const fetchTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todoId)
            .then(res => {
                dispatch(setTasksAC(todoId, res.data.items))
            })
    }
}
export const removeTaskTC = (taskId: string, todoId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todoId))
            })
    }
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todoListID, title)
        .then(res => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const changeTaskTC = (todoListID: string, domainModel: UpdateDomainTaskModelType, taskID: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let state = getState()
    let task = state.tasks[todoListID].find(t => t.id === taskID)
    if(!task){
        console.warn('Task not found in the state')
        return
    }
    let apiModel: UpdateTaskModel = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
    }
    taskAPI.updateTask(todoListID, taskID, apiModel)
        .then(res => {
            dispatch(updateTaskAC(taskID, apiModel, todoListID))
        })
}

