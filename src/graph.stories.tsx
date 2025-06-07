
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Graph } from './graph';
import { CircleNode, CircleNodeDataType } from './nodes/circle';
import { WorkflowNode, WorkflowNodeDataType } from './nodes/workflow';

const meta = {
    title: "Graph Examples",
    component: Graph,

} satisfies Meta<typeof Graph>;

export default meta;

type Story = StoryObj<typeof meta>;

/// Stories below


const nodes: CircleNodeDataType[] = [
    { name: "begin", id: "A" },
    { name: "path1", id: "B1" },
    { name: "path2", id: "B2" },
    { name: "end", id: "C" },
    { name: "end2", id: "C2" }
];

export const GraphExample: Story = {
    args: {
        nodeData: nodes,
        edges: [["A", "B1"], ["A", "B2"], ["B1", "C"], ["B2", "C"], ["B1","C2"]],
        nodeElement: CircleNode as any
    }
};


const nodes2: CircleNodeDataType[] = [
    { name: "Scissors", id: "S", color: "green" },
    { name: "Paper", id: "P", color: "red" },
    { name: "Rock", id: "R", color: "blue" },
];

export const CyclicExample: Story = {
    args: {
        nodeData: nodes2,
        edges: [["S","P","Cuts"],["P","R","Covers"],["R","S","Smashes"]],
        nodeElement: CircleNode as any 
    }
};



const nodes3: CircleNodeDataType[] = [
    { name: "begin", id: "A", color:"green" },
    { name: "Scissors", id: "S", color: "green" },
    { name: "Paper", id: "P", color: "red" },
    { name: "Rock", id: "R", color: "blue" },
    { name: "end1", id: "C1", color:"red" },
    { name: "end2", id: "C2", color:"red" }
];

export const TrickyExample: Story = {
    args: {
        nodeData: nodes3,
        edges: [["A","S"],["S","P"],["P","R"],["R","S"],["P","C1"],["R","C2"]],
        nodeElement: CircleNode as any 
    }
};

const nodes4: WorkflowNodeDataType[] = [
    { name: "Begin", id:"1", type:"start"},
    { name: "Eat Food", id:"2", type:"action"},
    { name: "Thirsty?", id:"3", type:"decision"},
    { name: "Drink", id:"4", type:"action"},
    { name: "End", id:"5", type:"end"}
]

export const Workflow: Story = {
    args: {
        nodeData: nodes4,
        edges: [["1","2"],["2","3"],["3","4","yes"],["3","5","no"],["4","5"]],
        nodeElement: WorkflowNode as any 
    }
};