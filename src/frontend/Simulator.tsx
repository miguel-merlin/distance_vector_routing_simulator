import { type EntityMap, EntityContext, Entity } from "./components/entity"
import { Node, NodeEntity } from "./components/Node"
import { Edge, EdgeEntity } from "./components/Edge"
import { Stage, Layer } from 'react-konva'

interface Simulator {

}

export function Simulator(_props: Simulator) {
   const env: EntityMap = {
        1: Entity.of<NodeEntity>({ id: 1, name: 'A', x: 50, y: 50 }),
        2: Entity.of<NodeEntity>({ id: 2, name: 'B', x: 300, y: 100 }),
        3: Entity.of<EdgeEntity>({ id: 3, name: 'e1', head: 1, tail: 2 })
   }
    return (
        <Stage width={500} height={500}>
            <EntityContext value={env}>
                <Layer>
                    <Edge ent={env[3]}/>
                </Layer>
                <Layer>
                    <Node ent={env[1]}/>
                    <Node ent={env[2]}/>
                </Layer>
            </EntityContext>
        </Stage>
    )
}