import { Group, Line } from "react-konva"
import { useContext } from "react"
import { type uid, BaseEntity, EntityContext, EntityProp } from "../../util/entity"
import { type PositionAttr, type BaseAttr, type ColorAttr } from "../../util/attributes"
import { ET_EDGE } from "../../util/typings"
import Highlight from "./util/Highlight"

export interface EdgeAttr extends BaseAttr {
    type: ET_EDGE
    head: uid
    tail: uid
    reversed?: boolean
}

export type EdgeEntity = BaseEntity
    & EdgeAttr
    & ColorAttr

export default function Edge({ ent }: EntityProp) {
    const map = useContext(EntityContext)
    const { head, tail } = ent.getAttr<EdgeAttr>();

    const hEnt = map.get(head)
    const tEnt = map.get(tail)

    if(!hEnt || !tEnt) {
        throw new Error("Edge's head or tail is undefined")
    }

    const h = hEnt.getAttr<PositionAttr>();
    const t = tEnt.getAttr<PositionAttr>();
    const points = [h.x, h.y, t.x, t.y];

    const { strokeClr, highlightClr } = hEnt.getAttrReq<ColorAttr>();

    return (
        <Group>
            <Line points={points} stroke={strokeClr}/>
            <Highlight type="ET_EDGE" color={highlightClr} points={points}/>
        </Group>
        
    )
}