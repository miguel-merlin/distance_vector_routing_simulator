import { EntityMap } from "./entity"
import { createContext } from "react"
import { RContext } from "./react-aliases"
import { EventQueue } from "./sim-event"
import { ClickRecord } from "+/interfaces/ClickRecord"

export const EntityContext: RContext<EntityMap> = createContext(new Map())
export const TimeContext: RContext<number> = createContext(0)
export const EventContext: RContext<EventQueue> = createContext<EventQueue>([])
export const ClickContext: RContext<ClickRecord> = createContext<ClickRecord>(new ClickRecord())