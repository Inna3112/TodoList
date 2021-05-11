import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
                      changeTaskTitle: tlChangeTaskTitle,
                      removeTodoList,
                      changeFilter,
                      changeTodoListTitle: tlChangeTodoListTitle
                  }: TodoListPropsType) {
    // const {filter, tasks, title: tlTitle, addTask, removeTask, changeFilter} = props;

    const addTaskToAddItemForm = (title: string) => {
        addTask(title, todoListID)
    }
    const tasksJSXElements = tasks.map(t => {
        const removeTask = () => {
            tlRemoveTask(t.id, todoListID)
        }
        const tlChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked, todoListID)
        }
        const changeTaskTitle = (title: string) => {
            tlChangeTaskTitle(t.id, title, todoListID)
        }
        return (
            <li>
                <span className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        onChange={tlChangeTaskStatus}
                        checked={t.isDone}
                    />
                    {/*<input*/}
                    {/*    onChange={tlChangeTaskStatus}*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={t.isDone}/>*/}
                    {/*<span>{t.title}</span>*/}
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })


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
                <EditableSpan title={tlTitle} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={onClickRemoveTodoList}>x</button>*/}
                <IconButton onClick={onClickRemoveTodoList} color={"secondary"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskToAddItemForm}/>

            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    variant={filter === "all" ? "contained" : "outlined"}
                    size={"small"}
                    color={"primary"}
                    // className={filter === "all" ? "active-filter" : ""}
                    name="all" onClick={onClickAllFilter}>All
                </Button>
                <Button
                    variant={filter === "active" ? "contained" : "outlined"}
                    size={"small"} color={"primary"}
                    style={{marginLeft: "3px"}}
                    // className={filter === "active" ? "active-filter" : ""}
                    name="active" onClick={onClickActiveFilter}>Active
                </Button>
                <Button
                    variant={filter === "completed" ? "contained" : "outlined"}
                    size={"small"} color={"primary"}
                    style={{marginLeft: "3px"}}
                    // className={filter === "completed" ? "active-filter" : ""}
                    name="completed" onClick={onClickCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;