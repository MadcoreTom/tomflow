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

    type RichNode = T & {
        x: number,
        y: number,
        in: string[],
        out: string[],
        idx: number
    }

    const richNodes: RichNode[] = props.nodeData.map((d, i) => ({
        ...d,
        x: 0, y: 0, idx: i,
        out: props.edges.filter(e => e[0] == d.id).map(e => e[1]),
        in: props.edges.filter(e => e[1] == d.id).map(e => e[0])
    }));

    const richNodeMap = richNodes.reduce((b, a) => { b[a.id] = a; return b; }, {} as { [id: string]: RichNode });

    const rank: number[][] = [richNodes.map(() => 1)];

    // Loops work best if they match max start-to-end distance
    for (let i = 0; i < 10; i++) {
        // copy
        rank.push([...rank[i]]);
        // accumulate the previuous rank value for each "in" link
        richNodes.forEach((r, j) => {
            r.in.forEach(a => {
                rank[i + 1][j] += rank[i][richNodeMap[a].idx];
            });
        });
    }

    console.log("RANK", rank[rank.length - 1]);

    richNodes.forEach((r, i) => r.x = rank[rank.length - 1][i]);

    // then map them to consecutive x values
    const sortedRichNodes = [...richNodes].sort((a, b) => a.x - b.x);
    const xMap: number[] = [];
    let xMapCount = 0;
    for (let i = 0; i < sortedRichNodes.length; i++) {
        if (i == 0) {
            xMap[sortedRichNodes[i].x] = xMapCount;
        }
        else if (sortedRichNodes[i].x > sortedRichNodes[i - 1].x) {
            xMapCount++;
            xMap[sortedRichNodes[i].x] = xMapCount;
        }
    }
    console.log("XMAP", JSON.stringify(xMap));

    // apply x mapping
    const nodeWidth = 100;
    sortedRichNodes.forEach(n => {
        n.x = nodeWidth / 2 + nodeWidth * xMap[n.x];
    })

    // Sort out y
    let nodeHeight = 50;
    sortedRichNodes.reverse().forEach(n => {
        const col = n.x / nodeWidth;
        const nh = nodeHeight * Math.pow(2, col); // reduce node height (only works with clear heirarchies)
        const len = n.in.length;
        let y = n.y - ((len - 1) / 2) * nh;
        n.in.forEach(name => {
            richNodeMap[name].y = y;
            y += nh;
        });
    });
    sortedRichNodes.reverse();// flip it back
    console.log("Y", sortedRichNodes.map(n => [n.x, n.y]));
    // then make the  y fit on screen
    const minY = richNodes.map(n => n.y).sort()[0]; // TODO don't sort everything, don't be lazy
    richNodes.forEach(n => n.y -= minY - nodeHeight / 2);

    // edges
    const edges = props.edges.map(e => {
        const sx = richNodeMap[e[0]].x;
        const sy = richNodeMap[e[0]].y;
        const ex = richNodeMap[e[1]].x;
        const ey = richNodeMap[e[1]].y;
        return <path d={`M${sx} ${sy} L${ex} ${ey}`} stroke="blue" />
    })


    const nodes = sortedRichNodes.map(n => <g transform={`translate(${n.x},${n.y})`}>
        {React.createElement(props.nodeElement, { data: n })}
    </g>)
    return <g>
        {edges}
        {nodes}
    </g>
}

