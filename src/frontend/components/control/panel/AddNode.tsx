import PanelWrapper from "./util/PanelWrapper";
import { Entity, uid } from "../../../util/entity";
import { useState } from "react";
import { NodeEntity } from "../../entity/Node";

export interface AddNodeProps {
    envSetter: (id: uid, ent: Entity | null) => void
}
export default function AddNode({ envSetter }: AddNodeProps) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [x, setX] = useState("")
    const [y, setY] = useState("")
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log("Adding Node!", "id:", id, "name:", name, "x:", x, "y:", y)
        const ent: Entity = Entity.of<NodeEntity>({
            type: "ET_NODE",
            id: id,
            name: name,
            x: Number.parseInt(x),
            y: Number.parseInt(y),
            size: 25
        })
        envSetter(id, ent)
    }

    return (
        <PanelWrapper onSubmit={onSubmit}>
            <h1 className="text-center underline decoration-solid font-bold">Add Node</h1>
            <label>Id</label>
            <input value={id} onChange={(e) => setId(e.target.value)}/>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <label>X</label>
            <input value={x} onChange={(e) => setX(e.target.value)}/>
            <label>Y</label>
            <input value={y} onChange={(e) => setY(e.target.value)}/>
        </PanelWrapper>
    )
}