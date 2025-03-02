import type { uid, BaseEntity, EntityMap } from "./entity"
import type { NodeEntity } from "./Node"
import { Line } from "react-konva"

export interface EdgeEntity extends BaseEntity {
    head: uid
    tail: uid
    reversed?: boolean
}

export function Edge(props: EdgeEntity & Required<EntityMap>) {
    const { head, tail } = props;
    const { map } = props;

    const h = map[head] as NodeEntity;
    const t = map[tail] as NodeEntity;

    return <Line points={[h.x, h.y, t.x, t.y]} strokeEnabled stroke="white"/>
}