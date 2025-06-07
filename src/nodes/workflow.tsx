import React from "react";

export interface WorkflowNodeDataType {
    name: string,
    id: string,
    type: "start" | "end" | "decision" | "action"
}

export const WorkflowNode: React.FunctionComponent<{ data: WorkflowNodeDataType }> = (props: { data: WorkflowNodeDataType }) => {

    let shape;
    switch (props.data.type) {
        case "start":
            shape = <rect rx={25} x={-50} y={-25} width={100} height={50} stroke="green" fill="white" strokeWidth={2} />
            break;
        case "end":
            shape = <rect rx={25} x={-50} y={-25} width={100} height={50} stroke="red" fill="white" strokeWidth={2} />
            break;
        case "decision":
            shape = <path d="M0 -50 L50 0 L0 50 L-50 0 Z" stroke="orange" fill="yellow" strokeWidth={2} />
            break;
        case "action":
            shape = <circle cx={0} cy={0} r={50} stroke="blue" fill="white" strokeWidth={2} />
    }

    return <g>
        {shape}
        <text textAnchor="middle" alignmentBaseline="central" fontFamily="Helvetica, sans-serif">{props.data.name}</text>
    </g>;
}