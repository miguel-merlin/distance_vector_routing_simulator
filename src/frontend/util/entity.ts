import { createContext } from "react"
import { BaseAttr } from "./attributes"
import { ET } from "./typings"

export type uid = number
export type EntityMap = Map<uid, Entity>
export type EntityProp = { ent: Entity }

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
    constructor(e: unknown) {
        this.ent = e
    }

    is(t: ET): boolean {
        return this.getType() === t
    }

    getType(): ET {
        return (this.ent as {type: ET}).type
    }

    getAs<T extends BaseEntity>(): T {
        return (this.ent as T)
    }

    getAttr<F extends BaseAttr>(): F {
        return (this.ent as F)
    }
}

export const EntityContext: React.Context<EntityMap> = createContext(new Map())