import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../dal/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a585aace-28a5-48d9-b1ef-e81ab36cf848'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.getTodo()
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'JS'
    useEffect(() => {
        todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoId = '2cf82ab3-a304-4d80-b179-74f9689c9d39'
    useEffect(() => {
        todolistAPI.deleteTodo(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
    const title = 'CSS'
    useEffect(() => {
        todolistAPI.updateTodo(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

