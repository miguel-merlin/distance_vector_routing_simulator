import type { BaseEntity } from "./entity"
import { Circle } from "react-konva"

export interface Node extends BaseEntity {
    x: number
    y: number
    radius?: number
}

export default function Node(props: Node) {
    const { x, y } = props;
    return <Circle x={x} y={y} radius={25} fill='green'/>
}