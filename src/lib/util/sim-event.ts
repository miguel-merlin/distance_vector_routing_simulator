import { uid } from "./entity"
import { EV_CULL_PACKETS, EV_MK_PACKET } from "./typings"

export interface MakePacketEvent {
    ty: EV_MK_PACKET
    data: {
        from: uid
        to: uid
    }
}

export interface CullPacketsEvent {
    ty: EV_CULL_PACKETS,
    data: {}
}

export type Event = 
    MakePacketEvent | CullPacketsEvent
export type EventQueue = Event[]
export type EventHandler = (queue: EventQueue, t: number) => EventQueue