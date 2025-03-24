function genMsg(entName: string) {
    return `Key that denotes an ${entName} Entity`;
}

export const ET_NODE = Symbol(genMsg("Node"))
export const ET_EDGE = Symbol(genMsg("Edge"))