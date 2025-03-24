import { Line } from "react-konva"
import { useContext } from "react"
import { type uid, BaseEntity, EntityContext, EntityProp } from "../util/entity"
import { type PositionAttr, type BaseAttr, type DecorateAttr } from "../util/attributes"
import { ET_EDGE } from "../util/entity-sym"

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

    const hEnt = map.get(head)
    const tEnt = map.get(tail)

    if(!hEnt || !tEnt) {
        throw new Error("Edge's head or tail is undefined")
    }

    const h = hEnt.getAttr<PositionAttr>();
    const t = tEnt.getAttr<PositionAttr>();

    return <Line points={[h.x, h.y, t.x, t.y]} strokeEnabled stroke="white"/>
}