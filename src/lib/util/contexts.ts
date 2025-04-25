import { EntityMap } from "./entity"
import { createContext } from "react"
import { RContext } from "./react-aliases"
import { ClickRecord } from "+/interfaces/ClickRecord"
import { PacketController } from "+/interfaces/PacketController"

export const EntityContext: RContext<EntityMap> = createContext(new Map())
export const TimeContext: RContext<number> = createContext(0)
export const ClickContext: RContext<ClickRecord> = createContext<ClickRecord>(new ClickRecord())
export const PacketContext: RContext<PacketController> = createContext<PacketController>(new PacketController())