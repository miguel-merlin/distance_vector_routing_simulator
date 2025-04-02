import { Group, Line } from "react-konva"
import { useContext, useState } from "react"
import { type uid, BaseEntity, Entity, EntityProp } from "+/util/entity"
import { type PositionAttr, type BaseAttr, type ColorAttr } from "+/util/attributes"
import { ET_EDGE } from "+/util/typings"
import Highlight from "./util/Highlight"
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
    const [hovered, setHovered] = useState(false)
    const map = useContext(EntityContext)
    const { head, tail } = ent.getAttr<EdgeAttr>();

    const hEnt = Entity.lookup(map, head)
    const tEnt = Entity.lookup(map, tail)

    const h = hEnt.getAttr<PositionAttr>();
    const t = tEnt.getAttr<PositionAttr>();
    const points = [h.x, h.y, t.x, t.y];

    const { strokeClr, highlightClr } = ent.getAttrReq<ColorAttr>();

    return (
        <Group onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Highlight type="ET_EDGE" color={highlightClr} points={points} visible={hovered}/>
            <Line points={points} stroke={strokeClr}/>
        </Group>
        
    )
}