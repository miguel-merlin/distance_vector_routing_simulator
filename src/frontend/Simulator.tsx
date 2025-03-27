import { Stage, Layer } from 'react-konva'
import { type EntityMap, Entity, EntityContext } from "+/util/entity"
import Node from "./components/entity/Node"
import Edge, { EdgeEntity } from "./components/entity/Edge"
import { useMemo } from 'react'
import Network from '+/interfaces/Network'

interface SimulatorProps {
    env: EntityMap
}

export function Simulator({ env }: SimulatorProps) {
    const { layers, network } = useMemo(() => {
        const sortedEnts: { node: Entity[], links: Entity[] } = { node: [], links: [] }
        const network = new Network()
        for(const ent of env.values()) {
            if(ent.is("ET_NODE"))
                sortedEnts.node.push(ent)
            else if(ent.is("ET_EDGE"))
                sortedEnts.links.push(ent)
        }

        for(const ent of sortedEnts.node)
            network.addNode(ent.getAs().id)
        for(const ent of sortedEnts.links) {
            const eEnt = ent.getAs<EdgeEntity>()
            network.addLink(eEnt.head, eEnt.tail, eEnt.weight)
        }

        return { layers: sortedEnts, network }
    }, [env])

    return (
        <Stage width={500} height={500}>
            <EntityContext value={env}>
                <Layer>
                    { layers.links.map((e, idx) => <Edge key={idx} ent={e}/>) }
                </Layer>
                <Layer>
                    { layers.node.map((e, idx) => <Node key={idx} ent={e}/>) }
                </Layer>
            </EntityContext>
        </Stage>
    )
}