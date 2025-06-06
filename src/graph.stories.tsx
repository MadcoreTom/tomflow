
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { PannableSvg } from './pannable-svg';
import React from 'react';
import { Graph } from './graph';

const meta = {
    title: "Graph Examples",
    component: PannableSvg,
    // tags: ['autodocs'],

} satisfies Meta<typeof PannableSvg>;

export default meta;

type Story = StoryObj<typeof meta>;

/// Stories below

type DataType = {
    id: string,
    name: string
}
const Circle: React.FunctionComponent<{ data: DataType }> = (props: { data: { name: string, id: string } }) => {
    return <g>
        <circle cx={0} cy={0} r={10} /><text y={30}>{props.data.name}</text>
    </g>;
}
const nodes: DataType[] = [
    { name: "tom", id: "T" },
    { name: "rachel", id: "R" },
    { name: "henry", id: "H" }
]

export const GraphExample: Story = {



    args: {
        children: <Graph edges={[["T","H"],["R","H"]]} nodeData={nodes} nodeElement={Circle} />,
        fullSize: true
    }
};
const moreNodes: DataType[] = [
    { name: "tom", id: "T" },
    { name: "rachel", id: "R" },
    { name: "henry", id: "H" },
    { name: "mum", id: "M" },
    { name: "dad", id: "D" },
    { name: "chris", id: "C" },
    { name: "nads", id: "N" }
]


export const bigExample: Story = {



    args: {
        children: <Graph edges={[["T", "H"], ["R", "H"], ["N", "R"], ["C", "R"], ["M", "T"], ["D", "T"]]} nodeData={moreNodes} nodeElement={Circle} />,
        fullSize: true
    }
};


const loopData: DataType[] = [
    { name: "Scissors", id: "S" },
    { name: "Paper", id: "P" },
    { name: "Rock", id: "R" },
]


export const loopExample: Story = {



    args: {
        children: <Graph edges={[["S","P"],["P","R"],["R","S"]]} nodeData={loopData} nodeElement={Circle} />,
        fullSize: true
    }
};


const loop2Data: DataType[] = [
    { name: "Scissors", id: "S" },
    { name: "Paper", id: "P" },
    { name: "Rock", id: "R" },
    { name:"End", id:"E"},
    { name:"Start", id:"start"}
]


export const loop2Example: Story = {



    args: {
        children: <Graph edges={[["S","P"],["P","R"],["R","S"], ["S","E"], ["start","R"]]} nodeData={loop2Data} nodeElement={Circle} />,
        fullSize: true
    }
};
