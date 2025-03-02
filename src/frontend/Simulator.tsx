import { EntityMap, EntityContext } from "./components/entity"
import { Node } from "./components/Node"
import { Edge } from "./components/Edge"
import { Stage, Layer } from 'react-konva'

interface Simulator {

}

export function Simulator(_props: Simulator) {
    const env: EntityMap = {
        1: { id: 1, name: 'A', x: 50, y: 50 },
        2: { id: 2, name: 'B', x: 300, y: 100 },
        3: { id: 3, name: 'e1', head: 1, tail: 2}
    }
    return (
        <Stage width={500} height={500}>
            <EntityContext value={env}>
                <Layer>
                    <Edge {...env[3]}/>
                </Layer>
                <Layer>
                    <Node {...env[1]}/>
                    <Node {...env[2]}/>
                </Layer>
            </EntityContext>
        </Stage>
    )
}