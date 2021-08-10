import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import TodoListsList from '../features/Todolists/TodoListsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../store/store';
import {RequestStatusType} from '../store/app-reducer';


type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                { status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodoListsList demo={demo}/>
            </Container>
        </div>
    );
}

export default AppWithRedux;

