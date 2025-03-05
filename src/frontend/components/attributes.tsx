export interface BaseAttr {}

export interface DecorateAttr extends BaseAttr {
    fill: string | "green"
    stroke: string | "black"
    label?: string
    labelClr: string | "black"
}

export interface PositionAttr extends BaseAttr {
    x: number
    y: number
}

export interface ShapeAttr extends BaseAttr {
    size: number
    w?: number
    h?: number
}