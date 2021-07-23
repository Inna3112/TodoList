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
export type GetTodoResponseType = TodolistType[]
export type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
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
