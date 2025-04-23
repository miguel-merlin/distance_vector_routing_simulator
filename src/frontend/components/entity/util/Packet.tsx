import { Packet as PacketType } from "+/interfaces/PacketController"
import { EntityContext, PacketContext } from "+/util/contexts"
import { generateTrack, getPacketColor } from "+/util/packet"
import { useContext, useMemo } from "react"
import { Rect } from "react-konva"

const PACKET_SIZE = 10

export interface PacketProp extends PacketType {
    t: number

    // From PacketType:
    // - id: uid
    // - source: uid
    // - dest: uid
    // - at: uid
    // - jumps: uid[]
}

export default function Packet({ t, id, source, dest, at, jumps }: PacketProp) {
    const controller = useContext(PacketContext)
    const env = useContext(EntityContext)

    const size = PACKET_SIZE
    const color = useMemo(() => getPacketColor(env, dest), [dest])
    const track = useMemo(() => {
        if(at !== dest && jumps.length > 0)
            return generateTrack(env, t, at, jumps[0]) 
        return null
    }, [source, dest, at])
    
    if(!track) {
        controller.popPacket(id)
        return <></>
    }

    const { done, pos } = track(t)
    if(done) {
        if(jumps.length > 0) {
            const checkpoint = jumps.shift()
            controller.updatePacket(id, {
                at: checkpoint,
                jumps: jumps
            })
        }
        else {
            controller.popPacket(id)
        }
    }

    return (
        <Rect 
            visible={!done}
            fill={color} 
            strokeWidth={2} 
            offsetX={size / 2}
            offsetY={size / 2}
            width={size}
            height={size}
            x={pos.x}
            y={pos.y} />
    )
}