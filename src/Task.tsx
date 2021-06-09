import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithReducers";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type PropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
}
export const Task = React.memo(({
                                    task,
                                    todoListId,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    removeTask
                                }: PropsType) => {

    const tlChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
    }, [task.id, todoListId, changeTaskStatus])
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, task.title, todoListId)
    }, [task.id, task.title, todoListId, changeTaskTitle])
    const removeTaskHandler = useCallback(()=> {
        removeTask(task.id, todoListId)
    }, [task.id, todoListId, removeTask])
    return (
        <div>
                <span className={task.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        onChange={tlChangeTaskStatus}
                        checked={task.isDone}
                    />
                    {/*<input*/}
                    {/*    onChange={tlChangeTaskStatus}*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={t.isDone}/>*/}
                    {/*<span>{t.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                </span>
            {/*<button onClick={removeTask}>x</button>*/}
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})