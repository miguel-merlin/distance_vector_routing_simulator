import { type BaseEntity, type EntityProp } from "./entity"
import { type PositionAttr, type DecorateAttr, type BaseAttr } from "./attributes"
import { Circle } from "react-konva"

export interface NodeAttr extends BaseAttr {
    
}

export interface NodeEntity extends 
    BaseEntity, 
    NodeAttr, PositionAttr, DecorateAttr 
    {}

export function Node({ ent }: EntityProp) {
    const { x, y } = ent.getAttr<PositionAttr>()
    return <Circle x={x} y={y} radius={25} fill='green'/>
}