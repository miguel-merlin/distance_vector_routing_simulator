import { createContext } from "react"

export type uid = number

export interface BaseEntity {
    id: uid
    name: string
    type: undefined
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
        return (this.ent as BaseEntity).type === t
    }

    getAs<T extends BaseEntity>(): T {
        return (this.ent as T)
    }
}

export type EntityMap = Record<uid, Entity>

export const EntityContext: React.Context<EntityMap> = createContext({})