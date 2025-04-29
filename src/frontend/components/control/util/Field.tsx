import { RRefHook } from "+/util/react-aliases";
import { ReactNode, useMemo, useRef } from "react";
import { FieldType } from "../Panel";
import Tooltip from "./Tooltip";

export type RawInputContainer = Record<string, string>
export interface FieldProps {
    name: string
    type: FieldType
    label: string
    inputs: RRefHook<RawInputContainer>
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1)
}

function setRef(ref: RRefHook<RawInputContainer>, k: string, v: string) {
    ref.current = {...ref.current, [k]: v}
}

function getTT(type: FieldType, ref: RRefHook<HTMLInputElement | null>, inputs: RRefHook<RawInputContainer>, k: string): ReactNode {
    switch(type) {
        case "id":
            return <Tooltip 
                text="Set Id" 
                onFullfilled={(r) => {
                    const ent = r.getTarget()
                    if(ref.current && ent) {
                        const v = ent.getAs().id
                        ref.current.value = v
                        setRef(inputs, k, v)
                    }
                }}/>
        case "vector":
            return <Tooltip 
                text="Set Position"
                onFullfilled={(r) => {
                    const pos = r.getPosition()
                    if(ref.current && pos) {
                        const v = `(${Math.floor(pos.x)}, ${Math.floor(pos.y)})`
                        ref.current.value = `(${Math.floor(pos.x)}, ${Math.floor(pos.y)})`
                        setRef(inputs, k, v)
                    }
                }}/>
        default:
            return <></>
    }
}

export default function Field({ name, type, label, inputs }: FieldProps) {
    const inpRef = useRef<HTMLInputElement | null>(null)
    const tt = useMemo(() => getTT(type, inpRef, inputs, name), [type, inpRef, inputs, name])
    
    return (
        <div>
            <label className="mb-1 block">{ capitalize(label) }</label>
            <input ref={inpRef}
                onChange={(e) => { setRef(inputs, name, e.target.value); }}/>
            { tt }
        </div>
    )
}