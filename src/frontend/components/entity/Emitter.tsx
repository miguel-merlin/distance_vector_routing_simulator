import { BaseAttr, ColorAttr, LabelAttr, PositionAttr, ShapeAttr } from "+/util/attributes";
import { BaseEntity, EntityNetwork, EntityProp, uid } from "+/util/entity";
import { Group, Rect } from "react-konva";
import Label from "./util/Label";
import Highlight from "./util/Highlight";
import { useState } from "react";

export interface EmitterAttr extends BaseAttr {
    disabled?: boolean
    destination?: uid
}

export type EmitterEntity = BaseEntity
    & EmitterAttr
    & PositionAttr
    & ShapeAttr
    & ColorAttr
    & LabelAttr

export default function Emitter({ ent }: EntityProp & EntityNetwork) {
    const [hovered, setHovered] = useState(false)

    const { x, y } = ent.getAttr<PositionAttr>()
    const { size } = ent.getAttrReq<ShapeAttr>()
    const { fillClr, highlightClr, strokeClr, labelClr } = ent.getAttrReq<ColorAttr>()
    const { label, fontFamily, fontSize } = ent.getAttrReq<LabelAttr>()

    return (
        <Group x={x} y={y} listening onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Highlight type="ET_EMIT" size={size} color={highlightClr} visible={hovered}/>
            <Rect fill={fillClr} stroke={strokeClr} strokeEnabled
                width={size} height={size}/>
            <Label label={label} color={labelClr} fontFamily={fontFamily} fontSize={fontSize}/>
        </Group>
        
    )
}