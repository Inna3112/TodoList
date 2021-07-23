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
    const [title, setTitle] = useState<string>('')
    const onClickCreateTodo = () => {
        todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
                setTitle('')
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder='Title' value={title} onChange={e => setTitle(e.currentTarget.value)} />
        <button onClick={onClickCreateTodo}>Create todo</button>
    </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')

    const onClickDeleteTodo = () => {
        todolistAPI.deleteTodo(todoId)
            .then((res) => {
                setState(res.data)
                setTodoId('')
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder='todoId' value={todoId}
               onChange={e => {setTodoId(e.currentTarget.value)}} />
        <button onClick={onClickDeleteTodo}>delete todolist</button>
    </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickUpdateTodo = () => {
        todolistAPI.updateTodo(todoId, title)
            .then((res) => {
                setState(res.data)
                setTodoId('')
                setTitle('')
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder='todoId' value={todoId}
                   onChange={(e) => {setTodoId(e.currentTarget.value)}} />
            <input placeholder='title' value={title}
                   onChange={(e) => {setTitle(e.currentTarget.value)}} />
            <button onClick={onClickUpdateTodo}>update todolist</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')

    useEffect(() => {
        const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
        taskAPI.getTasks(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    const onClickGetTasks = () => {
        taskAPI.getTasks(todoId)
            .then((res) => {
                setState(res.data)
                setTodoId('')
            })
    }

    //     const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder='todoId' value={todoId}
                   onChange={(e) => {setTodoId(e.currentTarget.value)}} />
            <button onClick={onClickGetTasks}>get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const onClickCreateTask = () => {
        taskAPI.createTask(todoId, taskTitle)
            .then((res) => {
                setState(res.data.data)
                setTodoId('')
                setTaskTitle('')
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder='todoId' value={todoId}
               onChange={(e) => {setTodoId(e.currentTarget.value)}} />
        <input placeholder='title' value={taskTitle}
               onChange={(e) => {setTaskTitle(e.currentTarget.value)}} />
        <button onClick={onClickCreateTask}>create task</button>
    </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const onClickDeleteTask = () => {
        taskAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
                setTodoId('')
                setTaskId('')
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder='todoId' value={todoId}
                   onChange={(e) => {setTodoId(e.currentTarget.value)}} />
            <input placeholder='taskId' value={taskId}
                   onChange={(e) => {setTaskId(e.currentTarget.value)}} />
            <button onClick={onClickDeleteTask}>delete task</button>
        </div>
    </div>

}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '88db940e-1aa8-49b1-9c31-cf118ad09e19'
        const taskId = 'ef844dc3-7e50-4d14-9e88-276beb89065c'
        const title = 'HTML'
        const description = 'learn htmllllll'
        const status = 1
        const priority = 3
        const startDate = null
        const deadline = null
        taskAPI.updateTask(todoId, taskId, {title, description, status, priority, startDate, deadline})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

