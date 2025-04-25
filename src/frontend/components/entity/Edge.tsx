import { Line } from "react-konva"
import { useContext } from "react"
import { type uid, BaseEntity, Entity, EntityProp } from "+/util/entity"
import { type PositionAttr, type BaseAttr, type ColorAttr } from "+/util/attributes"
import { ET_EDGE } from "+/util/typings"
import HighlightGroup from "./util/HighlightGroup"
import { EntityContext } from "+/util/contexts"

export interface EdgeAttr extends BaseAttr {
    type: ET_EDGE
    head: uid
    tail: uid
    weight: number
    reversed?: boolean
}

export type EdgeEntity = BaseEntity
    & EdgeAttr
    & ColorAttr

export default function Edge({ ent }: EntityProp) {
    const map = useContext(EntityContext)

    const { head, tail } = ent.getAttr<EdgeAttr>();

    const hEnt = Entity.lookup(map, head)
    const tEnt = Entity.lookup(map, tail)

    const h = hEnt.getAttr<PositionAttr>();
    const t = tEnt.getAttr<PositionAttr>();
    const points = [h.x, h.y, t.x, t.y];

    const { strokeClr, highlightClr } = ent.getAttrReq<ColorAttr>();

    return (
        <HighlightGroup for={ent} style={{ type: "ET_EDGE", color: highlightClr, points: points }}>
            <Line points={points} stroke={strokeClr}/>
        </HighlightGroup>
    )
}