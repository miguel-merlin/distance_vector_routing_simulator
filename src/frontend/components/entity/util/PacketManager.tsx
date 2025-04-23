import { PacketContext, TimeContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import Packet from "./Packet";
import { PacketController } from "+/interfaces/PacketController";
import { Layer } from "react-konva";
import { Layer as LayerType } from "konva/lib/Layer";
import { EntityMap } from "+/util/entity";
import Network from "+/interfaces/Network";

export interface PacketManagerProps {
    env: EntityMap
    network: Network
    layer: RRefHook<LayerType | null>
    children: ReactNode[]
}

export default function PacketManager({ env, network, layer, children }: PacketManagerProps) {
    const t = useContext(TimeContext)
    const controller = useMemo(() => new PacketController(), [])
    const tmpLayer = useRef<LayerType | null>(null)

    // Fairly expensive operation
    // Does not seem to impact performance as much
    useEffect(() => {
        const { packets } = controller
        for(const p of packets.values()) {
            const { id, jumps, dest } = p
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
    }, [env])

    useEffect(() => {
        const { current: destLayer } = layer
        const { current: ghostLayer } = tmpLayer

        if(destLayer && ghostLayer) {
            // Transport packets to desired layer
            destLayer.add(...ghostLayer.children)
            destLayer.draw()
        }
    }, [t])
    
    return (
        <PacketContext value={controller}>
            { ...children }
            <Layer ref={tmpLayer} visible={false}>
                {
                    controller.map((p) => 
                        <Packet key={p.id} t={t} {...p}/>
                    )
                }
            </Layer>
        </PacketContext>
    )
}