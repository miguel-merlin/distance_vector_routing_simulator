import { Vector2d } from "konva/lib/types"
import { PacketProp } from "@/components/entity/util/Packet"
import { EntityMap, uid } from "./entity"
import { ColorAttr, PositionAttr } from "./attributes"

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
            x: (dx / d) * s,
            y: (dy / d) * s
        },
        duration: Math.ceil(d / s)
    }
}

function getTrack(tstamp: number, start: Vector2d, dest: Vector2d, speed: number) {
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
        doneAt: TTL
    }
}

export function generateTrack(env: EntityMap, t: number, startId: uid, destId: uid) {
    const e1 = env.get(startId), e2 = env.get(destId);
    if(!e1 || !e2)
        throw new Error("Packet anchors undefined")
    const p1 = e1.getAttr<PositionAttr>()
    const p2 = e2.getAttr<PositionAttr>()
    return getTrack(t, p1, p2, 15)
}

export function getPacketColor(env: EntityMap, source: uid) {
    const e = env.get(source)
    if(!e) throw new Error("Packet Source is undefined")
    const { fillClr } = e.getAttrReq<ColorAttr>()
    return fillClr
}