import {TaskActionsType, tasksReducer} from './tasks-reducer';
import {TodolistActionsType, todoListsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from './auth-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodolistActionsType | TaskActionsType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
