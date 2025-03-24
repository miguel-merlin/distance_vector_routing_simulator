import { Circle } from "react-konva"
import { type BaseEntity, type EntityProp } from "../util/entity"
import { type PositionAttr, type DecorateAttr, type BaseAttr } from "../util/attributes"
import { ET_NODE } from "../util/entity-sym"

export interface NodeAttr extends BaseAttr {
    type: typeof ET_NODE
}

export type NodeEntity = BaseEntity
    & NodeAttr
    & PositionAttr
    & Partial<DecorateAttr>

export function Node({ ent }: EntityProp) {
    const { x, y } = ent.getAttr<PositionAttr>()
    return <Circle x={x} y={y} radius={25} fill='green'/>
}