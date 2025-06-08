import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { PannableSvg } from './pannable-svg';
import React from 'react';

const meta = {
    title: "Components/Pannable SVG",
    component: PannableSvg,
    tags: ['autodocs'],

} satisfies Meta<typeof PannableSvg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <circle cx={110} cy={50} r={20} />,
        width: 500,
        height: 500
    }
};

export const FullSize: Story = {
    args: {
        children: <g>
            <circle cx={0} cy={0} r={10} />
            <circle cx={110} cy={50} r={20} />
            <circle cx={30} cy={100} r={30} />
        </g>,
        fullSize: true
    }
};
