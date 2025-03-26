import PanelWrapper from "./util/PanelWrapper";
import { Entity, uid } from "../../../util/entity";
import { useState } from "react";

export interface DeleteProps {
    envSetter: (id: uid, ent: Entity | null) => void
}

export default function Delete({ envSetter }: DeleteProps) {
    const [id, setId] = useState("")
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log("Deleting!", "id:", id)
        envSetter(id, null)
    }

    return (
        <PanelWrapper onSubmit={onSubmit}>
            <h1 className="text-center underline decoration-solid font-bold">Delete</h1>
            <label>Id</label>
            <input value={id} onChange={(e) => setId(e.currentTarget.value)}/>
        </PanelWrapper>
    )
}