import {v1} from "uuid";
import {
    AddTodoListAT,
    RemoveTodoListAT, SetTodoListAT,
    todoListID_1,
    todoListID_2
} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModel} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {AppActionType, AppRootStateType} from "./store";
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "./app-reducer";


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
export const tasksReducer = (state = initialState, action: AppActionType): InitialTasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            // let todoListTasks = state[action.todoListID]
            // state[action.todoListID] = todoListTasks.filter(t => t.id !== action.taskId)
            return {...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

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
            // return action.todoLists.reduce((acc, tl) => {
            //     copyState[tl.id] = []
            //     return copyState
            // }, {...state})
            let copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return  {...state, [action.todoListID]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todoListID: string) => ({type: 'REMOVE-TASK', taskId, todoListID} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListID: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todoListID} as const)
export const setTasksAC = (todoListID: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', todoListID, tasks} as const)

//thunks
export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch<TaskActionsType | SetStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    taskAPI.getTasks(todoId)
        .then(res => {
            dispatch(setTasksAC(todoId, res.data.items))
            dispatch(setStatusAC('successed'))
        })
}
export const removeTaskTC = (taskId: string, todoId: string) => (dispatch: Dispatch<TaskActionsType>) => {
    taskAPI.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch<TaskActionsType | SetErrorActionType | SetStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    taskAPI.createTask(todoListID, title)
        .then(res => {
            if(res.data.resultCode === 0){
                let task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setStatusAC('successed'))
            } else {
                if(res.data.messages.length){
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setStatusAC('failed'))
            }

        })
}
export const changeTaskTC = (todoListID: string, domainModel: UpdateDomainTaskModelType, taskID: string) =>
    (dispatch: Dispatch<TaskActionsType>, getState: () => AppRootStateType) => {
    let state = getState()
    let task = state.tasks[todoListID].find(t => t.id === taskID)
    if (!task) {
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

//types
export type TaskActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | RemoveTodoListAT
    | AddTodoListAT
    | SetTodoListAT
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

