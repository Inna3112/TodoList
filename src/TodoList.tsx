import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./dal/todolist-api";
import {FilterValuesType} from "./store/todolists-reducer";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, newStatus: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

const TodoList = React.memo(({
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
                  }: TodoListPropsType) => {
    // const {filter, tasks, title: tlTitle, addTask, removeTask, changeFilter} = props;
    console.log('Todolist')
    const addTaskToAddItemForm = useCallback((title: string) => {
        addTask(title, todoListID)
    }, [todoListID, addTask])
    function getTasksForTodolist() {
        switch (filter) {
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
        return ( <Task key={t.id}
                       task={t}
                       todoListId={todoListID}
                       changeTaskStatus={changeTaskStatus}
                       changeTaskTitle={tlChangeTaskTitle}
                       removeTask={tlRemoveTask} />
        )
    })


    const onClickAllFilter = useCallback(() => changeFilter("all", todoListID), [todoListID, changeFilter])
    const onClickActiveFilter = useCallback(() => changeFilter("active", todoListID), [todoListID, changeFilter])
    const onClickCompletedFilter = useCallback(() => changeFilter("completed", todoListID), [todoListID, changeFilter])
    const onClickRemoveTodoList = useCallback(() => removeTodoList(todoListID), [todoListID, removeTodoList])
    const changeTodoListTitle = useCallback((title: string) => tlChangeTodoListTitle(title, todoListID), [tlChangeTodoListTitle, todoListID])
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
})

export default TodoList;