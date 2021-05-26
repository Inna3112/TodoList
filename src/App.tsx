import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bue', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: false}
        ],
    })

    function removeTask(taskId: string, todoListID: string) {
        //tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskId)
        //    UI обновись!!!
        //setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskId)})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        // setTasks({...tasks})
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        })

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        // setTasks({...tasks})
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }



    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: newTitle} : tl))
    }


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
    function getTasksForTodolist(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                              todoListID={tl.id}
                              title={tl.title}
                              tasks={getTasksForTodolist(tl)}
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

export default App;
