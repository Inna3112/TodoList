import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC, addTooListTC,
    changeFilterAC,
    changeTodoListTitleAC, fetchTodoListsTC, FilterValuesType, InitialTodoListsStateType,
    removeTodoListAC, removeTodoListTC,
} from "./store/todolists-reducer";
import {
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, InitialTasksStateType, removeTaskTC, addTaskTC
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStatuses, TaskType} from "./dal/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    //BLL

    const tasks = useSelector<AppRootStateType, InitialTasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, InitialTodoListsStateType>(state => state.todolists)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskTC(taskId, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, newStatus: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, newStatus, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
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
        dispatch(changeTodoListTitleAC(newTitle, todoListID))
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


    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                              todoListID={tl.id}
                              title={tl.title}
                              tasks={tasks[tl.id]}
                              filter={tl.filter}
                              addTask={addTask}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              removeTodoList={removeTodoList}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button
                        color={"inherit"}
                        variant={"outlined"}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
