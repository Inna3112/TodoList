import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, setTodoListsAC, TodoListEntityType, todoListsReducer} from "./todolists-reducer";
import {TaskStateType} from "../App/AppWithRedux";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListEntityType> = [];

    const action = addTodoListAC({title: "new todolist", id: 'todoListId', addedDate: '', order: 0});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodolists).toBe(action.todoList.id);
});
test('empty arrays should be added when we set todolists', () => {

    const action = setTodoListsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''},
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toEqual([]);
    expect(endState['2']).toEqual([]);
});







