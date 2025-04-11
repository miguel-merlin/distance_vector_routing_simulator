import { Circle, Group } from "react-konva"
import { type BaseEntity, type EntityProp } from "+/util/entity"
import { type PositionAttr, type ColorAttr, type BaseAttr, type LabelAttr, ShapeAttr } from "+/util/attributes"
import { ET_NODE } from "+/util/typings"
import Highlight from "./util/Highlight"
import Label from "./util/Label"
import { useContext, useState } from "react"
import { ClickContext } from "+/util/contexts"

export interface NodeAttr extends BaseAttr {
    type: ET_NODE
}

export type NodeEntity = BaseEntity
    & NodeAttr
    & PositionAttr
    & ColorAttr
    & LabelAttr
    & ShapeAttr

export default function Node({ ent }: EntityProp) {
    const [hovered, setHovered] = useState(false)
    const record = useContext(ClickContext)

    const { x, y } = ent.getAttr<PositionAttr>()
    const { fillClr, strokeClr, highlightClr, labelClr } = ent.getAttrReq<ColorAttr>()
    const { label, fontFamily, fontSize } = ent.getAttrReq<LabelAttr>()
    const { size } = ent.getAttr<ShapeAttr>()

    return (
        <Group x={x} y={y} listening 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            onMouseUp={() => record.setTarget(ent)} >
            <Highlight type="ET_NODE" color={highlightClr} size={size} visible={hovered}/>
            <Circle fill={fillClr} stroke={strokeClr} radius={size} strokeEnabled/>
            <Label label={label} color={labelClr} fontFamily={fontFamily} fontSize={fontSize}/>
        </Group>
    )
}