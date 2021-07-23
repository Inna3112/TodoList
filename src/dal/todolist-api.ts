import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a585aace-28a5-48d9-b1ef-e81ab36cf848'
    }
})
type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type TaskType = {
    description: string | null
    title: string
    // completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type TaskTypePutRequestType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
    todoList: null
}

export type GetTodoResponseType = TodolistType[]
export type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
export type GetTasksResponseType = {
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
    updateTask(todolistId: string, taskId: string, title: string, description: string, status: number, priority: number, startDate: string|null, deadline: string|null){
        return instance.put<CommonResponseType<TaskTypePutRequestType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            title,
            description,
            status,
            priority,
            startDate,
            deadline,
        })
    }
}