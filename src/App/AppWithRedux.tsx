import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../dal/todolist-api';
import TodoListsList from '../features/Todolists/TodoListsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    return (
        <div>
            <ErrorSnackbar />
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
                <LinearProgress />
            </AppBar>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>
    );
}

export default AppWithRedux;

