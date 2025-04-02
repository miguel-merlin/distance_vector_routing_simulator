import { TimeContext } from "+/util/contexts";
import { Packet as PacketInfo } from "+/util/packet";
import { RRefHook } from "+/util/react-aliases";
import { useContext } from "react";
import { Layer } from "react-konva";
import Packet from "./Packet";

export interface PacketManagerProps {
    packets: RRefHook<PacketInfo[]>
}

export default function PacketManager({ packets }: PacketManagerProps) {
    const t = useContext(TimeContext)

    return (
        <Layer>
            {
                packets.current.map((info, idx) => 
                    info.doneAt > t 
                    ? <Packet key={idx} {...info} t={t}/>
                    : <></>
                )
            }
        </Layer>
    )
}