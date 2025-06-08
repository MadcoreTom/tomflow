import type { Meta, StoryObj } from '@storybook/react-webpack5';

import React from 'react';
import { WorkflowNode } from './workflow';

const meta = {
    title: "Nodes/Workflow Node",
    component: WorkflowNode,
    render: args => <svg>
        <g transform='translate(50, 50)'>
            <WorkflowNode  {...args} />
        </g>
    </svg>,
} satisfies Meta<typeof WorkflowNode>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Start: Story = {
    args: {
        data: {
            id: "a",
            name: "Start",
            type: "start"
        }
    }
};

export const Action: Story = {
    args: {
        data: {
            id: "a",
            name: "Action",
            type: "action"
        }
    }
};

export const Decision: Story = {
    args: {
        data: {
            id: "a",
            name: "Decision",
            type: "decision"
        }
    }
};

export const End: Story = {
    args: {
        data: {
            id: "a",
            name: "End",
            type: "end"
        }
    }
};
