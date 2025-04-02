import { uid } from "./entity"
import { EV_UPDATE_PACKETS, EV_MK_PACKET } from "./typings"

export interface MakePacketEvent {
    ty: EV_MK_PACKET
    data: {
        source: uid
        dest: uid
        path: uid[]
    }
}

export interface UpdatePacketsEvent {
    ty: EV_UPDATE_PACKETS,
    data: {}
}

export type Event = 
    MakePacketEvent | UpdatePacketsEvent
export type EventQueue = Event[]
export type EventHandler = (queue: EventQueue, t: number) => EventQueue