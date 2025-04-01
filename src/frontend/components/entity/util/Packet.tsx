import { ColorAttr, PositionAttr } from "+/util/attributes"
import { Entity, EntityMap, uid } from "+/util/entity"
import { useMemo } from "react"
import { Rect } from "react-konva"

type Coord = { x: number, y: number }
type PFunc = (t: number) => { done: boolean, pos: Coord }
type TravelInfo = { vx: number, vy: number, duration: number }

export interface PacketProp {
    tstamp: number
    speed: number
    from: uid
    to: uid
    entMap: EntityMap
}

function getTravelInfo(p: Coord, q: Coord, s: number) : TravelInfo {
    const { x: x1, y: y1 } = p
    const { x: x2, y: y2 } = q
    const dx = x2 - x1
    const dy = y2 - y1
    const d = Math.sqrt( Math.pow(dy, 2) + Math.pow(dx, 2) )

    return {
        vx: dx / s,
        vy: dy / s,
        duration: Math.ceil(d / s)
    }
}

export default function Packet({ tstamp, speed, from, to, entMap }: PacketProp) {
    const fromEnt = Entity.lookup(entMap, from)
    const toEnt = Entity.lookup(entMap, to)

    const track: PFunc = useMemo(() => {
        const bornAt = tstamp
        const fromPos = fromEnt.getAttr<PositionAttr>()
        const toPos = toEnt.getAttr<PositionAttr>()
        const { vx, vy, duration } = getTravelInfo(fromPos, toPos, speed)
        const TTL = bornAt + duration

        return (t: number) => {
            if(t > TTL)
                return { done: true, pos: { x: 0, y: 0 } }

            const offset = t - bornAt
            return {
                done: false,
                pos: {
                    x: fromPos.x + offset * vx,
                    y: fromPos.y + offset * vy
                }
            }
        }
    }, [from, to, speed])

    const { fillClr } = toEnt.getAttrReq<ColorAttr>()
    const { done, pos } = track(tstamp)
    const size = 10
    return (
        <Rect 
            visible={!done}
            fill={fillClr} 
            strokeWidth={2} 
            offsetX={size / 2}
            offsetY={size / 2}
            x={pos.x}
            y={pos.y} />
    )
}