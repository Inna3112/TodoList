import React from 'react';
import {ComponentStory, ComponentMeta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AppWithRedux from '../AppWithRedux';
import {AppRootStateType} from "../store/store";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";



export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: Story = () => <AppWithRedux />


export const AppWithReduxExample = Template.bind({});


