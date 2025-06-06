import React from "react";

export interface CircleNodeDataType {
    name: string,
    id: string,
    color?: string,
    fontFamily?: string
}

export const CircleNode: React.FunctionComponent<{ data: CircleNodeDataType }> = (props: { data: CircleNodeDataType }) => {

// export function CircleNode(props: { data: CircleNodeDataType }) {
    return <g>
        <circle cx={0} cy={0} r={50} stroke={props.data.color || "#888888"} fill="white" />
        <text textAnchor="middle" alignmentBaseline="central" fontFamily={props.data.fontFamily || "Helvetica, sans-serif"}>{props.data.name}</text>
    </g>;
}