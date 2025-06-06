import React from "react"
import { PannableSvg } from "./pannable-svg"

export interface NodeData {
    id: string
}


export type GraphProps<T extends NodeData> = {
    nodeData: T[],
    edges: [string, string][],
    nodeElement: React.FunctionComponent<{ data: T }>
}

export function Graph<T extends NodeData>(props: GraphProps<T>): React.ReactElement<T> {
    return <PannableSvg fullSize={true}>
        <GraphInner  {...props} />
    </PannableSvg>
}

function GraphInner<T extends NodeData>(props: GraphProps<T>) {
    const richNodes = solveGraph(props.nodeData, props.edges);

    // fit on screen
    const minX = richNodes.map(n => n.x).sort()[0]; // TODO don't sort everything, don't be lazy
    const minY = richNodes.map(n => n.y).sort()[0]; // TODO don't sort everything, don't be lazy
    richNodes.forEach(n => {
        n.x -= minX;
        n.y -= minY;
    })

    // edges
    const richNodeMap = richNodes.reduce((b, a) => { b[a.data.id] = a; return b; }, {} as { [id: string]: RichNode<T> });
    const edges = props.edges.map(e => {
        const sx = richNodeMap[e[0]].x;
        const sy = richNodeMap[e[0]].y;
        const ex = richNodeMap[e[1]].x;
        const ey = richNodeMap[e[1]].y;
        return <path d={`M${sx} ${sy} L${ex} ${ey}`} stroke="blue" />
    })

    const nodes = richNodes.map(n => <g transform={`translate(${n.x},${n.y})`} key={n.data.id}>
        {React.createElement(props.nodeElement, { data: n.data })}
    </g>)
    return <g>
        {edges}
        {nodes}
    </g>
}

type RichNode<T extends NodeData> = {
    x: number,
    y: number,
    id: string,
    in: string[],
    out: string[],
    idx: number,
    data: T
}

function solveGraph<T extends NodeData>(nodes: T[], edges: [string, string][]): RichNode<T>[] {

    const richNodes: RichNode<T>[] = nodes.map((d, i) => ({
        data: d, idx: i, id: d.id,
        x: 0, y: 0,
        out: edges.filter(e => e[0] == d.id).map(e => e[1]),
        in: edges.filter(e => e[1] == d.id).map(e => e[0])
    }));

    const richNodeMap = richNodes.reduce((b, a) => { b[a.id] = a; return b; }, {} as { [id: string]: RichNode<T> });

    richNodes.forEach(n => {
        n.x = -1;
        n.y = Math.random() * 500;
    })

    // TODO find nodes with no "in" and set column to 1
    // then set their "out" notes column to 2 (unless already set)
    // then continue
    let cur = richNodes.filter(n=>n.in.length == 0);
    if(cur.length == 0){
        // TODO pick one with low "in.length" at least
        cur = [richNodes[0]];
    }

    let depth = 0;
    while(cur.length > 0){
        console.log("LOOP", cur.map(c=>c.id))
        let next:RichNode<T>[] = [];
        cur.forEach(c=>{
            c.x = depth;
            c.out.map(o=>richNodeMap[o]).filter(o=>o.x <0).forEach(o=>next.push(o));
        });
        depth += 110; // TODO node x spacing
        cur = next;
    }

    // assumes connected set
    // if no nodes with no "in" then pick one with a low "in" count
    return richNodes;
}