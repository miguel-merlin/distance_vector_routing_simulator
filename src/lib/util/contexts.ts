import { EntityMap } from "./entity"
import { createContext, useRef } from "react"
import { RRefHook, RContext } from "./react-aliases"
import { EventQueue } from "./sim-event"

export const EntityContext: RContext<EntityMap> = createContext(new Map())
export const TimeContext: RContext<number> = createContext(0)
export const EventContext: RContext<RRefHook<EventQueue>> = createContext(useRef<EventQueue>([]))