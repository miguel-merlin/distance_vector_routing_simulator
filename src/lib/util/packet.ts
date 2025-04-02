import { Vector2d } from "konva/lib/types"
import { PacketProp } from "@/components/entity/util/Packet"

type TravelInfo = { velocity: Vector2d, duration: number }
export type PFunc = (t: number) => { done: boolean, pos: Vector2d }
export type Packet = Omit<PacketProp, "t">

function getTravelInfo(p: Vector2d, q: Vector2d, s: number) : TravelInfo {
    const { x: x1, y: y1 } = p
    const { x: x2, y: y2 } = q
    const dx = x2 - x1
    const dy = y2 - y1
    const d = Math.sqrt( Math.pow(dy, 2) + Math.pow(dx, 2) )

    return {
        velocity: {
            x: dx / s,
            y: dy / s
        },
        duration: Math.ceil(d / s)
    }
}

export function generateTrack(tstamp: number, start: Vector2d, dest: Vector2d, speed: number) {
    const { x, y } = start
    const bornAt = tstamp
    const { velocity, duration } = getTravelInfo(start, dest, speed)
    const { x: vx, y: vy } = velocity
    const TTL = bornAt + duration

    return {
        track: (t: number) => {
            if(t > TTL)
                return { done: true, pos: { x: 0, y: 0 } }

            const offset = t - bornAt
            return {
                done: false,
                pos: {
                    x: x + offset * vx,
                    y: y + offset * vy
                }
            }
        },
        TTL: TTL
    }
}