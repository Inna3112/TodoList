import React, {useState} from 'react';
import '../App/App.css';
import TodoList from '../features/Todolists/Todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from '../dal/todolist-api';
import {FilterValuesType, TodoListEntityType} from '../store/todolists-reducer';
import {TaskStateType} from "../store/tasks-reducer";



function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListEntityType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to bue', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", status: TaskStatuses.Completed,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "CSS", status: TaskStatuses.Completed,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Meat", status: TaskStatuses.Completed,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Bread", status: TaskStatuses.New,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''}
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
            status: TaskStatuses.New,
            todoListId: todoListID, description: '', addedDate: '',
            deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''
        }
        setTasks({...tasks, [todoListID]: [{...newTask, entityStatus: 'idle',}, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskId: string, newStatus: TaskStatuses, todoListID: string) {
        // tasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        // setTasks({...tasks})
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, status: newStatus} : t)
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
        const newTodoList: TodoListEntityType = {id: newTodoListID, title, filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''}
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
    function getTasksForTodolist(todoList: TodoListEntityType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.status === TaskStatuses.New)
            case "completed":
                return tasks[todoList.id].filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                              todoList={tl}
                              tasks={getTasksForTodolist(tl)}
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
