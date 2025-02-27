import type { uid, BaseEntity, EntityMap } from "./entity"
import type { Node } from "./Node"
import { Line } from "react-konva"

export interface Edge extends BaseEntity {
    head: uid
    tail: uid
    reversed?: boolean
}

export default function Edge(props: Edge & Required<EntityMap>) {
    const { head, tail } = props;
    const { map } = props;

    const h = map[head] as Node;
    const t = map[tail] as Node;

    return <Line points={[h.x, h.y, t.x, t.y]} strokeEnabled stroke="white"/>
}