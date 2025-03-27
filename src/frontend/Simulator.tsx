import { Stage, Layer } from 'react-konva'
import { type EntityMap, EntityContext } from "./util/entity"
import Node from "./components/entity/Node"
import Edge from "./components/entity/Edge"

interface SimulatorProps {
    env: EntityMap
}

export function Simulator({ env }: SimulatorProps) {
    const ents = Array.from(env.values())

    return (
        <Stage width={500} height={500}>
            <EntityContext value={env}>
                <Layer>
                    { ents.filter((e) => e.is("ET_EDGE")) 
                        .map((e, idx) => <Edge key={idx} ent={e}/>)
                    }
                </Layer>
                <Layer>
                    { ents.filter((e) => e.is("ET_NODE"))
                        .map((e, idx) => <Node key={idx} ent={e}/>)
                    }
                </Layer>
            </EntityContext>
        </Stage>
    )
}