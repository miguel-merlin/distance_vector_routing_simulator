import { PFunc } from "+/util/packet"
import { Rect } from "react-konva"

export interface PacketProp {
    color: string
    size: number
    t: number
    track: PFunc
    TTL: number
}

export default function Packet({ color, size, t, track }: PacketProp) {
    const { done, pos } = track(t)
    return (
        <Rect 
            visible={!done}
            fill={color} 
            strokeWidth={2} 
            offsetX={size / 2}
            offsetY={size / 2}
            x={pos.x}
            y={pos.y} />
    )
}