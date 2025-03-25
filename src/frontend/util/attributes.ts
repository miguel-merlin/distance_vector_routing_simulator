export interface BaseAttr {}

export interface ColorAttr extends BaseAttr {
    fillClr?: string
    strokeClr?: string
    highlightClr?: string
    labelClr?: string
}

export interface LabelAttr extends BaseAttr {
    label?: string
    fontSize?: number
    fontFamily?: string
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