import type { EntityMap } from "./components/entity"
import { Node } from "./components/Node"
import { Edge } from "./components/Edge"
import { Stage, Layer } from 'react-konva'

interface Simulator {

}

export function Simulator(_props: Simulator) {
    const env: EntityMap = {
        map: {
            1: { id: 1, name: 'A', x: 50, y: 50 },
            2: { id: 2, name: 'B', x: 300, y: 100 },
            3: { id: 3, name: 'e1', head: 1, tail: 2}
        }
    }
    return (
        <Stage width={500} height={500}>
            <Layer>
                <Edge {...env.map[3]} map={env.map}/>
            </Layer>
            <Layer>
                <Node {...env.map[1]}/>
                <Node {...env.map[2]}/>
            </Layer>
        </Stage>
    )
}