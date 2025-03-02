import { uid, BaseEntity, EntityContext } from "./entity"
import type { NodeEntity } from "./Node"
import { Line } from "react-konva"
import { useContext } from "react"

export interface EdgeEntity extends BaseEntity {
    head: uid
    tail: uid
    reversed?: boolean
}

export function Edge(props: EdgeEntity) {
    const map = useContext(EntityContext)
    const { head, tail } = props;

    const h = map[head] as NodeEntity;
    const t = map[tail] as NodeEntity;

    return <Line points={[h.x, h.y, t.x, t.y]} strokeEnabled stroke="white"/>
}