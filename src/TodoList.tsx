import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

function TodoList({
                      todoListID, filter,
                      tasks,
                      title: tlTitle,
                      addTask,
                      removeTask: tlRemoveTask,
                      changeTaskStatus,
                      changeTaskTitle:tlChangeTaskTitle,
                      removeTodoList,
                      changeFilter,
                      changeTodoListTitle: tlChangeTodoListTitle
                  }: TodoListPropsType) {
    // const {filter, tasks, title: tlTitle, addTask, removeTask, changeFilter} = props;

    // const [title, setTitle] = useState<string>("");
    // const [error, setError] = useState<boolean>(false);
    const addTaskWrap = (title: string) => {
        addTask(title, todoListID)
    }
    const tasksJSXElements = tasks.map(t => {
        const removeTask = () => {
            tlRemoveTask(t.id, todoListID)
        }
        const tlChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, todoListID)
        }
        const changeTaskTitle = (title:string) => {
           tlChangeTaskTitle(t.id, title, todoListID)
        }
        return (
            <li className={t.isDone ? "is-done" : ""}>
                <input
                    onChange={tlChangeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}/>
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    // const onClickAddTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         addTask(trimmedTitle, todoListID)
    //     } else {
    //         setError(true)
    //     }
    //     setTitle("")
    // }

    // const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter") {
    //         onClickAddTask()
    //     }
    // }
    // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(false)
    // }

    const onClickAllFilter = () => changeFilter("all", todoListID)
    const onClickActiveFilter = () => changeFilter("active", todoListID)
    const onClickCompletedFilter = () => changeFilter("completed", todoListID)
    const onClickRemoveTodoList = () => removeTodoList(todoListID)
    const changeTodoListTitle = (title: string) => tlChangeTodoListTitle(title, todoListID)
    // const errorMessage = error
    //     ? <div className="error-message">Title is required</div>
    //     : null
    return (
        <div>
            <h3>
                <EditableSpan title={tlTitle} changeTitle={changeTodoListTitle} />
                <button onClick={onClickRemoveTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTaskWrap}/>
            {/*<div>*/}
            {/*    <input className={error ? "error" : ""}*/}
            {/*           value={title}*/}
            {/*           onChange={onChangeTitle}*/}
            {/*           onKeyPress={onKeyPressAddTask}*/}
            {/*    />*/}
            {/*    <button onClick={onClickAddTask}>+</button>*/}
            {/*    {errorMessage}*/}
            {/*</div>*/}
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""}
                        name="all" onClick={onClickAllFilter}>All
                </button>
                <button className={filter === "active" ? "active-filter" : ""}
                        name="active" onClick={onClickActiveFilter}>Active
                </button>
                <button className={filter === "completed" ? "active-filter" : ""}
                        name="completed" onClick={onClickCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;