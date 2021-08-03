import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addTaskTC, changeTaskTC, InitialTasksStateType, removeTaskTC} from "../../store/tasks-reducer";
import {
    addTooListTC,
    changeFilterAC, changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    InitialTodoListsStateType, removeTodoListTC
} from "../../store/todolists-reducer";
import {TaskStatuses} from "../../dal/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import TodoList from "./Todolist/TodoList";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

type PropsType = {
    demo?: boolean
}

const TodoListsList: React.FC<PropsType> = ({demo= false}) => {
    const tasks = useSelector<AppRootStateType, InitialTasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, InitialTodoListsStateType>(state => state.todolists)

    const dispatch = useDispatch()

    useEffect(() => {
        if(demo){
            return
        }
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskTC(taskId, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, newStatus: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskTC(todoListID, {status: newStatus}, taskId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTC(todoListID, {title: newTitle}, taskId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeFilterAC(value, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListTC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTooListTC(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(newTitle, todoListID))
    }, [dispatch])


    //UI

    // function getTasksForTodoList(){
    //     let tasksForTodoList = tasks
    //     if (filter === "active") {
    //         tasksForTodoList = tasks.filter(t => t.isDone === false)
    //     } else if (filter === "completed") {
    //         tasksForTodoList = tasks.filter(t => t.isDone === true)
    //     }
    //     return tasksForTodoList
    // }

    let todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                        todoList={tl}
                        tasks={tasks[tl.id]}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                        demo={demo}
                    />
                </Paper>
            </Grid>)
    })
    return (<>
        <Grid container style={{padding: "20px 0"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todoListsComponents}
        </Grid>
    </>)
}

export default TodoListsList