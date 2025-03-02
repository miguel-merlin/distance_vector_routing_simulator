export type uid = number

export interface BaseEntity {
    id: uid
    name: string
}

export type EntityMap = { 
    map: Record<uid, any>
}