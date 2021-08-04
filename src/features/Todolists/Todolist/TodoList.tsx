import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses} from '../../../dal/todolist-api';
import {FilterValuesType, TodoListEntityType} from '../../../store/todolists-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksTC, TaskEntityType} from '../../../store/tasks-reducer';


type TodoListPropsType = {
    todoList: TodoListEntityType
    tasks: Array<TaskEntityType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, newStatus: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    demo?: boolean
}

const TodoList = React.memo(({
                                 todoList,
                                 tasks,
                                 addTask,
                                 removeTask: tlRemoveTask,
                                 changeTaskStatus,
                                 changeTaskTitle: tlChangeTaskTitle,
                                 removeTodoList,
                                 changeFilter,
                                 changeTodoListTitle: tlChangeTodoListTitle,
                                 demo = false
                             }: TodoListPropsType) => {
    // const {filter, tasks, title: tlTitle, addTask, removeTask, changeFilter} = props;
    // if(typeof demo === 'undefined') demo = false

    const dispatch = useDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasksTC(todoList.id))
        }
    }, [])

    const addTaskToAddItemForm = useCallback((title: string) => {
        addTask(title, todoList.id)
    }, [todoList.id, addTask])

    function getTasksForTodolist() {
        switch (todoList.filter) {
            case "active":
                return tasks.filter(t => t.status === TaskStatuses.New)
            case "completed":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }

    let newTasks = getTasksForTodolist()
    const tasksJSXElements = newTasks.map(t => {
        return (<Task key={t.id}
                      task={t}
                      todoListId={todoList.id}
                      changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={tlChangeTaskTitle}
                      removeTask={tlRemoveTask}/>
        )
    })


    const onClickAllFilter = useCallback(() => changeFilter("all", todoList.id), [todoList.id, changeFilter])
    const onClickActiveFilter = useCallback(() => changeFilter("active", todoList.id), [todoList.id, changeFilter])
    const onClickCompletedFilter = useCallback(() => changeFilter("completed", todoList.id), [todoList.id, changeFilter])
    const onClickRemoveTodoList = useCallback(() => removeTodoList(todoList.id), [todoList.id, removeTodoList])
    const changeTodoListTitle = useCallback((title: string) => tlChangeTodoListTitle(title, todoList.id), [tlChangeTodoListTitle, todoList.id])
    // const errorMessage = error
    //     ? <div className="error-message">Title is required</div>
    //     : null
    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={onClickRemoveTodoList}>x</button>*/}
                <IconButton onClick={onClickRemoveTodoList} color={"secondary"}
                            disabled={todoList.entityStatus === 'loading'}
                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskToAddItemForm} disabled={todoList.entityStatus === 'loading'} />

            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    variant={todoList.filter === "all" ? "contained" : "outlined"}
                    size={"small"}
                    color={"primary"}
                    // className={filter === "all" ? "active-filter" : ""}
                    name="all" onClick={onClickAllFilter}>All
                </Button>
                <Button
                    variant={todoList.filter === "active" ? "contained" : "outlined"}
                    size={"small"} color={"primary"}
                    style={{marginLeft: "3px"}}
                    // className={filter === "active" ? "active-filter" : ""}
                    name="active" onClick={onClickActiveFilter}>Active
                </Button>
                <Button
                    variant={todoList.filter === "completed" ? "contained" : "outlined"}
                    size={"small"} color={"primary"}
                    style={{marginLeft: "3px"}}
                    // className={filter === "completed" ? "active-filter" : ""}
                    name="completed" onClick={onClickCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;