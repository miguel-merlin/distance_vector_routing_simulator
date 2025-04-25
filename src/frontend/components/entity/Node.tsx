import { Circle } from "react-konva"
import { type BaseEntity, type EntityProp } from "+/util/entity"
import { type PositionAttr, type ColorAttr, type BaseAttr, type LabelAttr, ShapeAttr } from "+/util/attributes"
import { ET_NODE } from "+/util/typings"
import HighlightGroup from "./util/HighlightGroup"
import Label from "./util/Label"

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
    const { x, y } = ent.getAttr<PositionAttr>()
    const { fillClr, strokeClr, highlightClr, labelClr } = ent.getAttrReq<ColorAttr>()
    const { label, fontFamily, fontSize } = ent.getAttrReq<LabelAttr>()
    const { size } = ent.getAttr<ShapeAttr>()

    return (
        <HighlightGroup for={ent} x={x} y={y} style={{ type: "ET_NODE", size: size, color: highlightClr}}>
            <Circle fill={fillClr} stroke={strokeClr} radius={size} strokeEnabled/>
            <Label label={label} color={labelClr} fontFamily={fontFamily} fontSize={fontSize}/>
        </HighlightGroup>
    )
}