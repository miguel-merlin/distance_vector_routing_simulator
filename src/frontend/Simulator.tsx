import { Stage, Layer } from 'react-konva'
import { type EntityMap, BaseEntity, Entity } from "+/util/entity"
import Node from "./components/entity/Node"
import Edge, { EdgeEntity } from "./components/entity/Edge"
import { useContext, useMemo, useRef } from 'react'
import Network from '+/interfaces/Network'
import Emitter from './components/entity/Emitter'
import Environment from './components/entity/util/Environment'
import PacketManager from './components/entity/util/PacketManager'
import { ClickContext } from '+/util/contexts'
import { Layer as LayerType } from 'konva/lib/Layer'

interface SimulatorProps {
    env: EntityMap
    paused: boolean
}

export function Simulator({ env, paused }: SimulatorProps) {
    const record = useContext(ClickContext)
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

        network.runDistanceVectorRouting()
        return { layers: sortedEnts, network }
    }, [env])
    const packetLayer = useRef<LayerType | null>(null)

    return (
        <Stage width={500} height={500}
            onMouseUp={({ target }) => {
                const pos = target.getRelativePointerPosition()
                if(pos) {
                    record.setPosition(pos)
                    record.fireUpdate()
                }
            }}>
            <Environment paused={paused} entMap={env}>
                <PacketManager env={env} network={network} layer={packetLayer}>
                    <Layer>
                        { layers.links.map((e, idx) => <Edge key={idx} ent={e}/>) }
                    </Layer>
                    <Layer ref={packetLayer}/>
                    <Layer>
                        { layers.nodelike.map((e, idx) => e.is("ET_NODE")
                            ? <Node key={idx} ent={e}/>
                            : <Emitter key={idx} ent={e} network={network}/>
                            ) 
                        }
                    </Layer>
                </PacketManager>
            </Environment>
        </Stage>
    )
}