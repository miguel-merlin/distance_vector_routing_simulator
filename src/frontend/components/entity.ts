import { createContext } from "react"

export type uid = number

export interface BaseEntity {
    id: uid
    name: string
}

export type EntityMap = Record<uid, any>

export const EntityContext: React.Context<EntityMap> = createContext({})