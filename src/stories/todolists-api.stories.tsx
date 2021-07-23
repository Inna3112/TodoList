import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../dal/todolist-api";

export default {
    title: 'API'
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

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
        taskAPI.getTasks(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
        const taskTitle = 'Learn JS'
        taskAPI.createTask(todoId, taskTitle)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
        const taskId = 'c6ea3311-56b4-4802-9ff8-c775005f91d3'
        taskAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
        const taskId = 'ef844dc3-7e50-4d14-9e88-276beb89065c'
        const title = 'HTML'
        const description = 'learn html'
        const status = 1
        const priority = 3
        const startDate = null
        const deadLine = null
        const completed = false
        taskAPI.updateTask(todoId, taskId, title, description, status, priority, startDate, deadLine)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

