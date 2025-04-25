import { PacketContext, TimeContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import Packet from "./Packet";
import { PacketController } from "+/interfaces/PacketController";
import { Layer } from "react-konva";
import { Layer as LayerType } from "konva/lib/Layer";
import { EntityMap } from "+/util/entity";
import Network from "+/interfaces/Network";
import { EdgeAttr } from "../Edge";
import { Packet as PacketType } from "+/util/packet-util";

export interface PacketManagerProps {
    env: EntityMap
    network: Network
    layer: RRefHook<LayerType | null>
    children: ReactNode[]
}

export default function PacketManager({ env, network, layer, children }: PacketManagerProps) {
    const t = useContext(TimeContext)
    const controller = useMemo(() => new PacketController(), [])
    const [packets, setPackets] = useState<PacketType[]>(controller.getPackets())
    const tmpLayer = useRef<LayerType | null>(null)

    // Fairly expensive operation
    // Does not seem to impact performance as much
    useEffect(() => {
        const packets = controller.getPackets()
        for(const p of packets) {
            const { id, at, jumps, dest } = p
            const [head, tail] = [at, jumps.length > 0 ? jumps[0] : dest]

            let edgeExists = false
            for(const ent of env.values()) {
                if(ent.is("ET_EDGE")) {
                    const { head: eHead, tail: eTail } = ent.getAttr<EdgeAttr>()
                    edgeExists = (head === eHead && tail === eTail) 
                        || (tail === eHead && head === eTail)
                    if(edgeExists) break
                }
            }

            if(!edgeExists) {
                console.log(`${t}: Packet ${id} forced remove due to edge deletion`)
                controller.popPacket(id)
                continue
            }

            if(jumps.length > 0) {
                const res = network.getShortestPath(jumps[0], dest)
                if(res) {
                    controller.updatePacket(id, {
                        ...p,
                        jumps: res.path
                    })
                }
                else {
                    // Something must have occured to stop
                    // packet from reaching destination

                    // Kill it when it reaches its current target
                    controller.updatePacket(id, {
                        ...p,
                        jumps: []
                    })
                }
            }
        }

        setPackets(controller.getPackets())
        redraw(layer, tmpLayer)
    }, [env])

    useEffect(() => {
        console.log(controller.getPackets())
        setPackets(controller.getPackets())
        redraw(layer, tmpLayer) 
    }, [t])
    
    return (
        <PacketContext value={controller}>
            { ...children }
            <Layer ref={tmpLayer} visible={false}>
                {
                    packets.map((p) => 
                        <Packet key={p.id} t={t} {...p}/>
                    )
                }
            </Layer>
        </PacketContext>
    )
}

function redraw(drawLayer: RRefHook<LayerType | null>, ghostLayer: RRefHook<LayerType | null>) {
    const { current: dest } = drawLayer
    const { current: ghost } = ghostLayer

    if(dest && ghost) {
        // Transport packets to desired layer
        dest.add(...ghost.children)
        dest.draw()
    }
}