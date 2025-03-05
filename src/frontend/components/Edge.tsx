import { uid, BaseEntity, EntityContext, EntityProp } from "./entity"
import { type PositionAttr, type BaseAttr, type DecorateAttr } from "./attributes"
import { Line } from "react-konva"
import { useContext } from "react"

export const ET_EDGE = Symbol("Key that denotes an Edge Entity")

export interface EdgeAttr extends BaseAttr {
    type: typeof ET_EDGE
    head: uid
    tail: uid
    reversed?: boolean
}

export type EdgeEntity = BaseEntity
    & EdgeAttr
    & Partial<DecorateAttr>

export function Edge({ ent }: EntityProp) {
    const map = useContext(EntityContext)
    const { head, tail } = ent.getAttr<EdgeAttr>();

    const h = map[head].getAttr<PositionAttr>();
    const t = map[tail].getAttr<PositionAttr>();

    return <Line points={[h.x, h.y, t.x, t.y]} strokeEnabled stroke="white"/>
}