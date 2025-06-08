
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Graph } from './graph';
import { CircleNode, CircleNodeDataType } from './nodes/circle';
import { WorkflowNode, WorkflowNodeDataType } from './nodes/workflow';

const meta = {
    title: "Graph",
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

const babelEdges:[string,string,string?][] = [
["@babel/core@7.27.4","@ampproject/remapping@2.3.0"],
["@babel/core@7.27.4","@babel/code-frame@7.27.1"],
["@babel/core@7.27.4","@babel/generator@7.27.5"],
["@babel/core@7.27.4","@babel/helper-compilation-targets@7.27.2"],
["@babel/core@7.27.4","@babel/helper-module-transforms@7.27.3"],
["@babel/core@7.27.4","@babel/helpers@7.27.6"],
["@babel/core@7.27.4","@babel/parser@7.27.5"],
["@babel/core@7.27.4","@babel/template@7.27.2"],
["@babel/core@7.27.4","@babel/traverse@7.27.4"],
["@babel/core@7.27.4","@babel/types@7.27.6"],
["@babel/core@7.27.4","convert-source-map@2.0.0"],
["@babel/core@7.27.4","debug@4.4.1"],
["@babel/core@7.27.4","gensync@1.0.0-beta.2"],
["@babel/core@7.27.4","json5@2.2.3"],
["@babel/core@7.27.4","semver@6.3.1"],
["@ampproject/remapping@2.3.0","@jridgewell/gen-mapping@0.3.8"],
["@ampproject/remapping@2.3.0","@jridgewell/trace-mapping@0.3.25"],
["@babel/code-frame@7.27.1","@babel/helper-validator-identifier@7.27.1"],
["@babel/code-frame@7.27.1","js-tokens@4.0.0"],
["@babel/code-frame@7.27.1","picocolors@1.1.1"],
["@babel/generator@7.27.5","@babel/parser@7.27.5"],
["@babel/generator@7.27.5","@babel/types@7.27.6"],
["@babel/generator@7.27.5","@jridgewell/gen-mapping@0.3.8"],
["@babel/generator@7.27.5","@jridgewell/trace-mapping@0.3.25"],
["@babel/generator@7.27.5","jsesc@3.1.0"],
["@babel/helper-compilation-targets@7.27.2","semver@6.3.1"],
["@babel/helper-compilation-targets@7.27.2","@babel/compat-data@7.27.5"],
["@babel/helper-compilation-targets@7.27.2","@babel/helper-validator-option@7.27.1"],
["@babel/helper-compilation-targets@7.27.2","browserslist@4.25.0"],
["@babel/helper-compilation-targets@7.27.2","lru-cache@5.1.1"],
["@babel/helper-module-transforms@7.27.3","@babel/traverse@7.27.4"],
["@babel/helper-module-transforms@7.27.3","@babel/helper-module-imports@7.27.1"],
["@babel/helper-module-transforms@7.27.3","@babel/helper-validator-identifier@7.27.1"],
["@babel/helpers@7.27.6","@babel/template@7.27.2"],
["@babel/helpers@7.27.6","@babel/types@7.27.6"],
["@babel/parser@7.27.5","@babel/types@7.27.6"],
["@babel/template@7.27.2","@babel/code-frame@7.27.1"],
["@babel/template@7.27.2","@babel/parser@7.27.5"],
["@babel/template@7.27.2","@babel/types@7.27.6"],
["@babel/traverse@7.27.4","@babel/code-frame@7.27.1"],
["@babel/traverse@7.27.4","@babel/generator@7.27.5"],
["@babel/traverse@7.27.4","@babel/parser@7.27.5"],
["@babel/traverse@7.27.4","@babel/template@7.27.2"],
["@babel/traverse@7.27.4","@babel/types@7.27.6"],
["@babel/traverse@7.27.4","debug@4.4.1"],
["@babel/traverse@7.27.4","globals@11.12.0"],
["@babel/types@7.27.6","@babel/helper-string-parser@7.27.1"],
["@babel/types@7.27.6","@babel/helper-validator-identifier@7.27.1"],
["debug@4.4.1","ms@2.1.3"],
["@babel/helper-module-imports@7.27.1","@babel/traverse@7.27.4"],
["@babel/helper-module-imports@7.27.1","@babel/types@7.27.6"],
["@jridgewell/gen-mapping@0.3.8","@jridgewell/trace-mapping@0.3.25"],
["@jridgewell/gen-mapping@0.3.8","@jridgewell/set-array@1.2.1"],
["@jridgewell/gen-mapping@0.3.8","@jridgewell/sourcemap-codec@1.5.0"],
["@jridgewell/trace-mapping@0.3.25","@jridgewell/resolve-uri@3.1.2"],
["@jridgewell/trace-mapping@0.3.25","@jridgewell/sourcemap-codec@1.5.0"],
["browserslist@4.25.0","caniuse-lite@1.0.30001721"],
["browserslist@4.25.0","electron-to-chromium@1.5.165"],
["browserslist@4.25.0","node-releases@2.0.19"],
["browserslist@4.25.0","update-browserslist-db@1.1.3"],
["lru-cache@5.1.1","yallist@3.1.1"],
["update-browserslist-db@1.1.3","picocolors@1.1.1"],
["update-browserslist-db@1.1.3","escalade@3.2.0"]
].map(a=>[a[0],a[1],undefined]);

const babelNodes: CircleNodeDataType[] = babelEdges.flat().filter(a=>a).sort()
    .reduce((acc, cur) => { if (cur != acc[acc.length - 1]) { acc.push(cur as string); } return acc }, [] as string[])
    .map(title => ({
        id: title,
        name: (title.match(/([^\/^\@]+)@.*$/) as any)[1],
        fontFamily: "monospace"
    }));

export const Babel: Story = {
    name: "Babel Dependency Tree",
    args: {
        nodeData: babelNodes,
        edges: babelEdges,
        nodeElement: CircleNode as any
    }
};
