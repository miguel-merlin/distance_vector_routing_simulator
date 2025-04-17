import { Stage, Layer } from 'react-konva'
import { type EntityMap, BaseEntity, Entity } from "+/util/entity"
import Node from "./components/entity/Node"
import Edge, { EdgeEntity } from "./components/entity/Edge"
import { useContext, useMemo, useRef } from 'react'
import Network from '+/interfaces/Network'
import Emitter from './components/entity/Emitter'
import Environment from './components/entity/util/Environment'
import { generateTrack, getPacketColor, Packet } from '+/util/packet'
import PacketManager from './components/entity/util/PacketManager'
import { EventHandler, EventQueue } from '+/util/sim-event'
import { RRefHook } from '+/util/react-aliases'
import { ClickContext } from '+/util/contexts'

interface SimulatorProps {
    env: EntityMap
    paused: boolean
}

function evHandler(env: EntityMap, packets: RRefHook<Packet[]>) : EventHandler {
    return (queue: EventQueue, t: number) => {
        for(const q of queue) {
            switch(q.ty) {
                case "EV_MK_PACKET":
                    const { source, dest, path } = q.data
                    const cp = path.shift()
                    if(!cp) throw Error("Packet Checkpoint is undefined")
                    const { track, doneAt } = generateTrack(env, t, cp, path[0])
                    const color = getPacketColor(env, dest)

                    packets.current.push({
                        color: color,
                        size: 10,
                        track: track,
                        doneAt: doneAt,
                        source: source,
                        checkpoint: cp,
                        dest: dest,
                        path: path
                    })
                    break
                case "EV_UPDATE_PACKETS":
                    packets.current = packets.current.map((p) => {
                        const { doneAt, path } = p 
                        if(doneAt < t) {
                            const cp = path.shift()
                            if(!cp) throw Error("Packet Checkpoint is undefined")
                            return {
                                ...p,
                                checkpoint: cp,
                                path: p.path
                            }
                        }
                        return p
                    })
                    .filter(({ checkpoint, dest }) => checkpoint != dest)
                    .map((p) => {
                        const { doneAt } = p
                        if(doneAt < t) {
                            const { checkpoint, path } = p
                            const { track, doneAt: newDoneAt } = generateTrack(env, t, checkpoint, path[0])
                            return {
                                ...p,
                                track: track,
                                doneAt: newDoneAt
                            }
                        } 
                        return p
                    })
                    break
            }
        }
        return [{ ty: "EV_UPDATE_PACKETS", data: {} }]
    }
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
    const packets = useRef<Packet[]>([])

    return (
        <Stage width={500} height={500}
            onMouseUp={({ target }) => {
                const pos = target.getRelativePointerPosition()
                if(pos) {
                    record.setPosition(pos)
                    record.fireUpdate()
                }
            }}>
            <Environment paused={paused} entMap={env} eventHandler={evHandler(env, packets)}>
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