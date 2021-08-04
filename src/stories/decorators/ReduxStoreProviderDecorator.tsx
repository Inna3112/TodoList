import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../../store/store';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../store/tasks-reducer';
import {v1} from 'uuid';
import { todoListsReducer} from '../../store/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../dal/todolist-api';
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML", status: TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "CSS", status: TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId1", description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''}

        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Meat", status: TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: "Bread", status: TaskStatuses.New,
                todoListId: "todolistId2", description: '', addedDate: '',
                deadline: '', entityStatus: 'idle', order: 0, priority: TaskPriorities.Low, startDate: ''}

        ],
    },
    app: {
        error: null,
        status: 'idle',
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}