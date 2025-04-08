/** ENTITY **/
export type ET = 
    ET_NODE | ET_EDGE | ET_EMIT
export type ET_NODE = "ET_NODE"
export type ET_EDGE = "ET_EDGE"
export type ET_EMIT = "ET_EMIT"

/** ATTRIBUTES **/
export type ATR =
    ATR_COLOR | ATR_LABEL | ATR_POSITION | ATR_SHAPE
export type ATR_COLOR = "ATR_COLOR"
export type ATR_LABEL = "ATR_LABEL"
export type ATR_POSITION = "ATR_POSITION"
export type ATR_SHAPE = "ATR_SHAPE"

/** CONTROL ACTIONS */
export type CTRL =
    CTRL_ADDNODE | CTRL_ADDEDGE | CTRL_ADDEMIT | CTRL_DELETE
export type CTRL_ADDNODE = "CTRL_ADDNODE"
export type CTRL_ADDEDGE = "CTRL_ADDEDGE"
export type CTRL_ADDEMIT = "CTRL_ADDEMIT"
export type CTRL_DELETE = "CTRL_DELETE"

/** EVENTS */
export type EV =
    EV_MK_PACKET | EV_UPDATE_PACKETS
export type EV_MK_PACKET = "EV_MK_PACKET"
export type EV_UPDATE_PACKETS = "EV_UPDATE_PACKETS"