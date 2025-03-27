import { PanelProps } from "@/components/control/Panel";
import { EdgeEntity } from "@/components/entity/Edge";
import { NodeEntity } from "@/components/entity/Node";
import { Entity, EntityMap, uid } from "./entity";
import { RStateHook } from "./react-aliases";
import { CTRL } from "./typings";

type StatelessPanelProp = Omit<PanelProps, "inputs">
type ActionMap = Record<CTRL, (envState: RStateHook<EntityMap>) => StatelessPanelProp>

function saveEntity(envState: RStateHook<EntityMap>, uid: uid, ent: Entity | null) {
    const [ents, setter] = envState
    
    if(ent)
        ents.set(uid, ent)
    else
        ents.delete(uid)
    setter(new Map(ents.entries()))
}

export const ACTION_MAP: ActionMap = {
    CTRL_ADDNODE: (envState) => ({
        fields: [
            { key: "id", type: "string" },
            { key: "name", type: "string" },
            { key: "x", type: "number" },
            { key: "y", type: "number" }
        ],
        onSubmit: ({ id, name, x, y }) => {
            const uid = id as uid
            const ent = Entity.of<NodeEntity>({
                type: "ET_NODE",
                id: uid,
                name: name as string,
                x: x as number,
                y: y as number,
                size: 25
            })
            saveEntity(envState, uid, ent)
        }
    }),

    CTRL_ADDEDGE: (envState) => ({
        fields: [
            { key: "id", type: "string" },
            { key: "head", label: "Head Id", type: "string" },
            { key: "tail", label: "Tail Id", type: "string" }
        ],
        onSubmit: ({ id, head, tail }) => {
            const uid = id as uid
            const ent = Entity.of<EdgeEntity>({
                type: "ET_EDGE",
                id: uid,
                name: uid,
                head: head as uid,
                tail: tail as uid
            })
            saveEntity(envState, uid, ent)
        }
    }),

    CTRL_DELETE: (envState) => ({
        fields: [
            { key: "id", type: "string" }
        ],
        onSubmit: ({ id }) => {
            const uid = id as uid
            saveEntity(envState, uid, null)
        }
    })
}