import { PacketContext, TimeContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { ReactNode, useContext, useEffect, useMemo, useRef } from "react";
import Packet from "./Packet";
import { PacketController } from "+/interfaces/PacketController";
import { Layer } from "react-konva";
import { Layer as LayerType } from "konva/lib/Layer";

export interface PacketManagerProps {
    layer: RRefHook<LayerType | null>
    children: ReactNode[]
}

export default function PacketManager({ layer, children }: PacketManagerProps) {
    const t = useContext(TimeContext)
    const controller = useMemo(() => new PacketController(), [])
    const tmpLayer = useRef<LayerType | null>(null)

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