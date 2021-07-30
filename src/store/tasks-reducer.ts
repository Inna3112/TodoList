import {v1} from "uuid";
import {
    AddTodoListAT,
    RemoveTodoListAT, SetTodoListAT,
    todoListID_1,
    todoListID_2
} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModel} from "../dal/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


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

//actions
export const removeTaskAC = (taskId: string, todoListID: string) => ({type: 'REMOVE-TASK', taskId, todoListID} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListID: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todoListID} as const)
export const setTasksAC = (todoListID: string, tasks: Array<TaskType>) => ({type: 'SET-TASKS', todoListID, tasks} as const)

//thunks
export const fetchTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todoId)
        .then(res => {
            dispatch(setTasksAC(todoId, res.data.items))
        })
}
export const removeTaskTC = (taskId: string, todoId: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}
export const addTaskTC = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todoListID, title)
        .then(res => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}
export const changeTaskTC = (todoListID: string, domainModel: UpdateDomainTaskModelType, taskID: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
export type ActionsType =
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

