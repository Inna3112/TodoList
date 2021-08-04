import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses} from '../../../../dal/todolist-api';
import {TaskEntityType} from '../../../../store/tasks-reducer';

type PropsType = {
    task: TaskEntityType
    todoListId: string
    changeTaskStatus: (taskId: string, newStatus: TaskStatuses, todoListID: string) => void
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
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todoListId)
    }, [task.id, todoListId, changeTaskStatus])
    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todoListId)
    }, [task.id, task.title, todoListId, changeTaskTitle])
    const removeTaskHandler = useCallback(()=> {
        removeTask(task.id, todoListId)
    }, [task.id, todoListId, removeTask])
    return (
        <div>
                <span className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
                    <Checkbox
                        color={"primary"}
                        onChange={tlChangeTaskStatus}
                        checked={task.status === TaskStatuses.Completed}
                    />
                    {/*<input*/}
                    {/*    onChange={tlChangeTaskStatus}*/}
                    {/*    type="checkbox"*/}
                    {/*    checked={t.isDone}/>*/}
                    {/*<span>{t.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                </span>
            {/*<button onClick={removeTask}>x</button>*/}
            <IconButton onClick={removeTaskHandler} disabled={task.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
    )
})