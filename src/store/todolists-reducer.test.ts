import {
    addTodoListAC, changeFilterAC, changeTodoListEntityStatusAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodolistActionsType, TodoListEntityType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "./app-reducer";


let todolistId1: string
let todolistId2: string

let startState: Array<TodoListEntityType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', order: 0, addedDate: ''},
    ]
})
test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {


    const endState = todoListsReducer(startState, addTodoListAC({
        id: 'newID',
        title: "New Todolist",
        addedDate: '',
        order: 0,
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: TodolistActionsType = {
        type: 'CHANGE-TODOLIST-TITLE',
        todoListID: todolistId2,
        newTitle: newTodolistTitle
    };

    const endState = todoListsReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct todolist should change its entity status', () => {

    let newStatus: RequestStatusType = 'loading'

    const action: TodolistActionsType = {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        todoListID: todolistId2,
        entityStatus: newStatus
    };

    const endState = todoListsReducer(startState, changeTodoListEntityStatusAC(todolistId2, newStatus));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe('loading');
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action: TodolistActionsType = {
        type: 'CHANGE-FILTER',
        todoListID: todolistId2,
        filter: newFilter
    };

    const endState = todoListsReducer(startState, changeFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct todolists should be set to state', () => {

    const action: TodolistActionsType = {
        type: 'SET-TODOLISTS',
        todoLists: startState
    };

    const endState = todoListsReducer([], setTodoListsAC(startState));

    expect(endState.length).toBe(2);
});



