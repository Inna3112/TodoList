import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a585aace-28a5-48d9-b1ef-e81ab36cf848'
    }
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string|null
    deadline: string|null
}

type GetTodoResponseType = TodolistType[]
type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
type GetTasksResponseType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}
export const todolistAPI = {
    getTodo(){
        return instance.get<GetTodoResponseType>('todo-lists')
    },
    createTodo(title: string){
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodo(todoId: string){
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string){
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    }
}
export const taskAPI = {
    getTasks(todoId: string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string){
        return instance.post<CommonResponseType<TaskType>>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel){
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}