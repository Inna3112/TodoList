import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../features/Todolists/Todolist/Task/Task';
import {TaskStatuses} from '../dal/todolist-api';


export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task clicked')

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', status: TaskStatuses.Completed, title: 'JS', order: 0, todoListId: '',
        startDate: '', addedDate: '', priority: 0, description: '', deadline: ''},
    todoListId: 'todolist1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', status: TaskStatuses.New, title: 'JS', order: 0, todoListId: '',
        startDate: '', addedDate: '', priority: 0, description: '', deadline: ''},
    todoListId: 'todolist1'
}
