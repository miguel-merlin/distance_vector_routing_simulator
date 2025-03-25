import { Circle, Group } from "react-konva"
import { type BaseEntity, type EntityProp } from "../../util/entity"
import { type PositionAttr, type ColorAttr, type BaseAttr, type LabelAttr } from "../../util/attributes"
import { ET_NODE } from "../../util/typings"
import Highlight from "./util/Highlight"
import Label from "./util/Label"

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
    const { fillClr, strokeClr, highlightClr, labelClr } = ent.getAttrReq<ColorAttr>()
    const { label, fontFamily, fontSize } = ent.getAttrReq<LabelAttr>()
    return (
        <Group x={x} y={y}>
            <Highlight type="ET_NODE" color={highlightClr} size={25}/>
            <Circle fill={fillClr} stroke={strokeClr}/>
            <Label label={label} color={labelClr} fontFamily={fontFamily} fontSize={fontSize}/>
        </Group>
    )
}