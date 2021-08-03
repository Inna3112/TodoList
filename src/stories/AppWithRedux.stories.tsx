import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import AppWithRedux from '../App/AppWithRedux';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";



export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;


const Template: Story = () => <AppWithRedux demo={true}/>


export const AppWithReduxExample = Template.bind({});


