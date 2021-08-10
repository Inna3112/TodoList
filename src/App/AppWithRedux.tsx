import React from 'react';
import './App.css';
import  Typography from '@material-ui/core/Typography';
import  Toolbar from '@material-ui/core/Toolbar';
import  IconButton from '@material-ui/core/IconButton';
import  Container from '@material-ui/core/Container';
import  Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Menu} from '@material-ui/icons';
import TodoListsList from '../features/Todolists/TodoListsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../store/store';
import {RequestStatusType} from '../store/app-reducer';
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";



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
                    <Switch>
                        <Route exact path={'/'} render={() => <TodoListsList demo={demo}/>} />
                        <Route path={'/login'} render={() => <Login />} />
                        <Route path={'/404'} render={() => <h1 style={{'textAlign': 'center'}}>404: PAGE NOT FOUND</h1>} />
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Container>
            </div>
    );
}

export default AppWithRedux;

