import { Circle } from "react-konva"
import { type BaseEntity, type EntityProp } from "../../util/entity"
import { type PositionAttr, type ColorAttr, type BaseAttr, type LabelAttr } from "../../util/attributes"
import { ET_NODE } from "../../util/typings"

export interface NodeAttr extends BaseAttr {
    type: ET_NODE
}

export type NodeEntity = BaseEntity
    & NodeAttr
    & PositionAttr
    & ColorAttr
    & LabelAttr

export default function Node({ ent }: EntityProp) {
    const { x, y } = ent.getAttr<PositionAttr>()
    return <Circle x={x} y={y} radius={25} fill='green'/>
}