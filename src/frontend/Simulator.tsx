import { Stage, Layer } from 'react-konva'
import { type EntityMap, BaseEntity, Entity } from "+/util/entity"
import Node from "./components/entity/Node"
import Edge, { EdgeEntity } from "./components/entity/Edge"
import { useMemo, useRef } from 'react'
import Network from '+/interfaces/Network'
import Emitter from './components/entity/Emitter'
import Environment from './components/entity/util/Environment'
import { generateTrack, Packet } from '+/util/packet'
import { ColorAttr, PositionAttr } from '+/util/attributes'
import PacketManager from './components/entity/util/PacketManager'

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

    const packets = useRef<Packet[]>([])

    return (
        <Stage width={500} height={500}>
            <Environment paused={true} entMap={env} 
                eventHandler={(queue, t) => {
                    for(const q of queue) {
                        switch(q.ty) {
                            case "EV_MK_PACKET":
                                const e1 = env.get(q.data.from), e2 = env.get(q.data.to)
                                if(!e1 || !e2)
                                    throw new Error("Packet anchors undefined")
                                const start = e1.getAttr<PositionAttr>()
                                const dest = e2.getAttr<PositionAttr>()
                                const { track, TTL } = generateTrack(t, start, dest, 5)

                                const { fillClr } = e1.getAttrReq<ColorAttr>()
                                packets.current.push({
                                    color: fillClr,
                                    size: 10,
                                    track: track,
                                    TTL: TTL
                                })
                                break;
                        }
                    }
                    return queue
                }}>
                <Layer>
                    { layers.links.map((e, idx) => <Edge key={idx} ent={e}/>) }
                </Layer>
                <PacketManager packets={packets}/>
                <Layer>
                    { layers.nodelike.map((e, idx) => e.is("ET_NODE")
                        ? <Node key={idx} ent={e}/>
                        : <Emitter key={idx} ent={e} network={network}/>
                        ) 
                    }
                </Layer>
            </Environment>
        </Stage>
    )
}