export interface BaseAttr {}

export interface DecorateAttr extends BaseAttr {
    fill?: string
    stroke?: string
    label?: string
    labelClr?: string
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