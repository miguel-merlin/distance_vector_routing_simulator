import { createContext } from "react"
import { BaseAttr } from "./attributes"

export type uid = number

export interface BaseEntity {
    id: uid
    name: string
}

export class Entity {
    ent: unknown

    static of<T extends BaseEntity>(ent: T): Entity {
        return new Entity(ent)
    }

    /** Use static method of<T>() for better type safety */
    constructor(e: any) {
        this.ent = e
    }

    is(t: symbol): boolean {
        return (this.ent as any).type === t
    }

    getAs<T extends BaseEntity>(): T {
        return (this.ent as T)
    }

    getAttr<F extends BaseAttr>(): F {
        return (this.ent as F)
    }
}

export type EntityMap = Record<uid, Entity>

export const EntityContext: React.Context<EntityMap> = createContext({})
export type EntityProp = { ent: Entity }