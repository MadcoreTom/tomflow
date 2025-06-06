import React, { ReactElement } from "react";
import { useState } from "react";

const backgroundStyle = {
    backgroundColor: "#f0effa",
    opacity: 1,
    backgroundImage: "radial-gradient(#000567 0.9500000000000001px, #f0effa 0.9500000000000001px)",
    backgroundSize: "19px 19px"
}

export type PannableSvgProps = {
    children: ReactElement
} & (
        { width: number, height: number } | { fullSize: true }
    );
/**
 * Creates a SVG and pans the background and the main <g>
 * without re-rendering the child components
 */
export function PannableSvg(props: PannableSvgProps) {
    const [mouseDown, setMouseDown] = useState(false);
    const [offset, setOffset] = useState([0, 0]);

    function onDrag(evt: React.MouseEvent) {
        if (mouseDown) {
            setOffset([offset[0] + evt.movementX, offset[1] + evt.movementY]);
        }
    }


    const style: React.CSSProperties = {
        backgroundPosition: `${offset[0]}px ${offset[1]}px`,
        ...backgroundStyle,
        cursor: mouseDown ? "grabbing" : "grab"
    }
    const width = "width" in props ? props.width : 100;
    const height = "height" in props ? props.height : 100;
    if ("fullSize" in props) {
        style.width = "100%";
        style.height = "100%";
    }

    return <svg height={height} width={width}
        onMouseMoveCapture={onDrag}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseOut={() => setMouseDown(false)}
        onMouseLeave={() => setMouseDown(false)}
        style={style}
        onContextMenu={(e) => e.preventDefault()}>
        <g transform={`translate(${offset[0]},${offset[1]})`}>
            {props.children}
        </g>
    </svg>

}