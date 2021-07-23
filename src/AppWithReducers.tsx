import React, {useReducer} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, TodoListEntityType,
    todoListsReducer
} from './store/todolists-reducer';
import {tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './store/tasks-reducer';
import {TaskPriorities, TaskStatuses} from "./dal/todolist-api";

// export type TaskStateType = {
//     [key: string]: Array<TaskType>
// }

function AppWithReducers() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to bue', filter: 'all', addedDate: '', order: 0}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: "HTML", status: TaskStatuses.Completed,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "CSS", status: TaskStatuses.Completed,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: todoListID_1, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Meat", status: TaskStatuses.Completed,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Bread", status: TaskStatuses.New,
                todoListId: todoListID_2, description: '', addedDate: '',
                deadline: '', order: 0, priority: TaskPriorities.Low, startDate: ''}
        ],
    })

    function removeTask(taskId: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskId: string, newStatus: TaskStatuses, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, newStatus,todoListID))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {

        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodoLists(changeFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        let action = addTodoListAC(title)

        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        dispatchToTodoLists(changeTodoListTitleAC(newTitle, todoListID))
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

export default AppWithReducers;
