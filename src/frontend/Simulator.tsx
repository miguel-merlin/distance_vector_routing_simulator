import { Stage, Layer } from 'react-konva'
import { type EntityMap, BaseEntity, Entity, EntityContext } from "+/util/entity"
import Node from "./components/entity/Node"
import Edge, { EdgeEntity } from "./components/entity/Edge"
import { useMemo } from 'react'
import Network from '+/interfaces/Network'
import Emitter, { EmitterEntity } from './components/entity/Emitter'

interface SimulatorProps {
    env: EntityMap
}

export function Simulator({ env }: SimulatorProps) {
    const { layers, network } = useMemo(() => {
        const sortedEnts: { nodelike: Entity[], links: Entity[] } = { nodelike: [], links: [] }
        const network = new Network()
        for(const ent of env.values()) {
            if(ent.is("ET_NODE") || ent.is("ET_EMIT"))
                sortedEnts.nodelike.push(ent)
            else if(ent.is("ET_EDGE"))
                sortedEnts.links.push(ent)
        }

        for(const ent of sortedEnts.nodelike)
            network.addNode(ent.getAs<BaseEntity>().id)
        for(const ent of sortedEnts.links) {
            const eEnt = ent.getAs<EdgeEntity>()
            network.addLink(eEnt.head, eEnt.tail, eEnt.weight)
        }

        return { layers: sortedEnts, network }
    }, [env])

    const test = Entity.of<EmitterEntity>({
        type: "ET_EMIT",
        id: "T1",
        name: "T",
        x: 50,
        y: 50,
        size: 50
    })

    return (
        <Stage width={500} height={500}>
            <EntityContext value={env}>
                <Layer>
                    { layers.links.map((e, idx) => <Edge key={idx} ent={e}/>) }
                </Layer>
                <Layer>
                    { <Emitter ent={test} network={network}/> }
                    { layers.nodelike.map((e, idx) => e.is("ET_NODE")
                        ? <Node key={idx} ent={e}/>
                        : <Emitter key={idx} ent={e} network={network}/>
                        ) 
                    }
                </Layer>
            </EntityContext>
        </Stage>
    )
}