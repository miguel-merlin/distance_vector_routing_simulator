import { type BaseEntity, type EntityProp } from "./entity"
import { type PositionAttr, type DecorateAttr, type BaseAttr, LabelAttr } from "./attributes"
import { Circle } from "react-konva"
import { DECOR_DEFAULTS, LABEL_DEFAULTS } from "./_defaults"

export const ET_NODE = Symbol("Key that denotes a Node Entity")

export interface NodeAttr extends BaseAttr {
    type: typeof ET_NODE
}

export type NodeEntity = BaseEntity
    & NodeAttr
    & PositionAttr
    & Partial<DecorateAttr>
    & LabelAttr

export function Node({ ent }: EntityProp) {
    const { x, y } = ent.getAttr<PositionAttr>()
    const label = ent.getAttr<LabelAttr>(LABEL_DEFAULTS);
    const decor = ent.getAttr<DecorateAttr>(DECOR_DEFAULTS);

    return <Circle x={x} y={y} radius={25} fill='green'/>
}