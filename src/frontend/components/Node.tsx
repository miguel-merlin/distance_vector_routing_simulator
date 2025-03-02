import type { BaseEntity } from "./entity"
import { Circle } from "react-konva"

export interface NodeEntity extends BaseEntity {
    x: number
    y: number
    radius?: number
}

export function Node(props: NodeEntity) {
    const { x, y } = props;
    return <Circle x={x} y={y} radius={25} fill='green'/>
}