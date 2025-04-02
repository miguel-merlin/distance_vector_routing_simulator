import { uid } from "./entity"
import { EV_MK_PACKET } from "./typings"

export interface MakePacketEvent {
    ty: EV_MK_PACKET
    data: {
        from: uid
        to: uid
    }
}

export type Event = 
    MakePacketEvent
export type EventQueue = Event[]
export type EventHandler = (queue: EventQueue, t: number) => EventQueue