import { Stage, Layer } from 'react-konva'
import { type EntityMap, EntityContext, Entity } from "./util/entity"
import Node, { type NodeEntity } from "./components/entity/Node"
import Edge, { type EdgeEntity } from "./components/entity/Edge"

interface Simulator {

}

export function Simulator(_props: Simulator) {
    const env: EntityMap = new Map()
    env.set(1, Entity.of<NodeEntity>({ type: "ET_NODE", id: 1, name: 'A', x: 50, y: 50, size: 25 }))
    env.set(2, Entity.of<NodeEntity>({ type: "ET_NODE", id: 2, name: 'B', x: 300, y: 100, size: 25 }))
    env.set(3, Entity.of<EdgeEntity>({ type: "ET_EDGE", id: 3, name: 'e1', head: 1, tail: 2 }))

    return (
        <Stage width={500} height={500}>
            <EntityContext value={env}>
                <Layer>
                    <Edge ent={env.get(3) as Entity}/>
                </Layer>
                <Layer>
                    <Node ent={env.get(1) as Entity}/>
                    <Node ent={env.get(2) as Entity}/>
                </Layer>
            </EntityContext>
        </Stage>
    )
}