import { PanelProps } from "@/components/control/Panel";
import { EdgeEntity } from "@/components/entity/Edge";
import { NodeEntity } from "@/components/entity/Node";
import { Entity, EntityMap, uid } from "./entity";
import { RStateHook, StateDispatch } from "./react-aliases";
import { CTRL, ET } from "./typings";
import { EmitterEntity } from "@/components/entity/Emitter";
import { Vector2d } from "konva/lib/types";

type StatelessPanelProp = Omit<PanelProps, "inputs">
type ActionMap = Record<CTRL, (envState: RStateHook<EntityMap>) => StatelessPanelProp>

function saveEnvState(setter: StateDispatch<EntityMap>, env: EntityMap) {
    setter(new Map(env.entries()))
}

function generateId(type: ET) {
    const tstamp = Date.now()
    return `${type}-${tstamp}`
}

export const ACTION_MAP: ActionMap = {
    CTRL_ADDNODE: ([env, setter]) => ({
        fields: [
            { key: "name", type: "string" },
            { key: "position", type: "vector" },
        ],
        onSubmit: ({ name, position }) => {
            const uid = generateId("ET_NODE")
            const { x, y } = position as Vector2d
            const ent = Entity.of<NodeEntity>({
                type: "ET_NODE",
                id: uid,
                name: name as string,
                x: x,
                y: y,
                size: 25
            })
            const newEnv = Entity.save(env, uid, ent)
            saveEnvState(setter, newEnv)
        }
    }),

    CTRL_ADDEDGE: ([env, setter]) => ({
        fields: [
            { key: "head", label: "Head Id", type: "id" },
            { key: "tail", label: "Tail Id", type: "id" },
            { key: "weight", type: "number" }
        ],
        onSubmit: ({ head, tail, weight }) => {
            const uid = generateId("ET_EDGE")
            const ent = Entity.of<EdgeEntity>({
                type: "ET_EDGE",
                id: uid,
                name: uid,
                weight: weight as number,
                head: head as uid,
                tail: tail as uid
            })
            const newEnv = Entity.save(env, uid, ent, [head as uid, tail as uid])
            saveEnvState(setter, newEnv)
        }
    }),

    CTRL_ADDEMIT: ([env, setter]) => ({
        fields: [
            { key: "name", type: "string" },
            { key: "position", type: "vector" },
            { key: "spawnRate", type: "number" }
        ],
        onSubmit: ({ name, position, spawnRate }) => {
            const uid = generateId("ET_EMIT")
            const { x, y } = position as Vector2d
            const ent = Entity.of<EmitterEntity>({
                type: "ET_EMIT",
                id: uid,
                name: name as string,
                x: x,
                y: y,
                size: 50,
                spawnRate: spawnRate as number
            })
            const newEnv = Entity.save(env, uid, ent)
            saveEnvState(setter, newEnv)
        }
    }),

    CTRL_DELETE: ([env, setter]) => ({
        fields: [
            { key: "id", type: "id" }
        ],
        onSubmit: ({ id }) => {
            const uid = id as uid
            const newEnv = Entity.delete(env, uid)
            saveEnvState(setter, newEnv)
        }
    })
}