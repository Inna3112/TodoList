import {
    addTaskAC, changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer, TaskStateType, updateTaskAC
} from "./tasks-reducer";
import {TaskStatuses} from "../dal/todolist-api";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

let startState: TaskStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            }
        ]
    };
})
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, deadline: '',
                description: '', priority: 0, addedDate: '', startDate: '',
                todoListId: '', entityStatus: 'idle', order: 0
            }
        ]
    });
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        id: "1",
        title: "juice",
        status: TaskStatuses.New,
        deadline: '',
        description: '',
        priority: 0,
        addedDate: '',
        startDate: '',
        todoListId: 'todolistId2',
        order: 0
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][0].entityStatus).toBe('idle');
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: "salad"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("salad");
    expect(endState["todolistId1"][1].title).toBe("JS");

});

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC({
        title: "new todolist",
        id: "todolistId3",
        order: 0,
        addedDate: ''
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
test('task should be added for todolist', () => {

    const action = setTasksAC("todolistId1", startState["todolistId1"]);

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
test('entity status of specified task should be changed', () => {

    const action = changeTaskEntityStatusAC("2",  "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].entityStatus).toBe('loading');
    expect(endState["todolistId1"][1].entityStatus).toBe('idle');
});








