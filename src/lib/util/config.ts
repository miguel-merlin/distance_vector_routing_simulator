export interface Config {
    NODE_SIZE: number,
    EMITTER_SIZE: number,
    PACKET_SIZE: number,
    TICK_INTERVAL: number,
    TICK_RATE: number,
    NODE_COLOR: string,
    HIGHLIGHT_COLOR: string,
    LABEL_COLOR: string
    STROKE_COLOR: string
    ENTITY_FONT_SIZE: number
    ENTITY_FONT_FAMILY: string | undefined
}

export const CONFIG_DEFAULT: Config = {
    NODE_SIZE: 25,
    EMITTER_SIZE: 50,
    PACKET_SIZE: 10,
    TICK_INTERVAL: 1000,
    TICK_RATE: 1,
    NODE_COLOR: "lightgrey",
    HIGHLIGHT_COLOR: "yellow",
    LABEL_COLOR: "black",
    STROKE_COLOR: "black",
    ENTITY_FONT_SIZE: 16,
    ENTITY_FONT_FAMILY: undefined
}