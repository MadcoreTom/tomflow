import type { Meta, StoryObj } from '@storybook/react-webpack5';

import React from 'react';
import { CircleNode } from './circle';

const meta = {
    title: "Circle Node",
    component: CircleNode,
    render: args => <svg>
        <g transform='translate(50, 50)'>
            <CircleNode  {...args} />
        </g>
    </svg>,
} satisfies Meta<typeof CircleNode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: {
            id: "a",
            name: "Hello",
        }
    }
};

export const Colored: Story = {
    args: {
        data: {
            id: "a",
            name: "Hello",
            color: "red",
            fontFamily: "monospace"
        }
    }
};
