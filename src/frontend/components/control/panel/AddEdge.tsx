import { useState } from "react";
import { Entity, uid } from "../../../util/entity";
import PanelWrapper from "./util/PanelWrapper";
import { EdgeEntity } from "../../entity/Edge";

export interface AddEdgeProps {
    envSetter: (id: uid, ent: Entity | null) => void
}

export default function AddEdge({ envSetter }: AddEdgeProps) {
    const [id, setId] = useState("")
    const [headId, setHeadId] = useState("")
    const [tailId, setTailId] = useState("")

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log("Adding Edge!", "id:", id, "head:", headId, "tail:", tailId)
        const ent: Entity = Entity.of<EdgeEntity>({
            type: "ET_EDGE",
            id: id,
            name: id,
            head: headId,
            tail: tailId
        })
        envSetter(id, ent)
    }

    return (
        <PanelWrapper onSubmit={onSubmit}>
            <h1 className="text-center underline decoration-solid font-bold">Add Edge</h1>
            <label>Id</label>
            <input value={id} onChange={(e) => setId(e.currentTarget.value)}/>
            <label>Head Id</label>
            <input value={headId} onChange={(e) => setHeadId(e.currentTarget.value)}/>
            <label>Tail Id</label>
            <input value={tailId} onChange={(e) => setTailId(e.currentTarget.value)}/>
        </PanelWrapper>
    )
}