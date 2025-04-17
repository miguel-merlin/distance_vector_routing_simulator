import { RRefHook } from "+/util/react-aliases";
import { ReactNode, useMemo, useRef } from "react";
import { FieldType } from "../Panel";
import IdTT from "./tooltip/IdTT";
import PositionTT from "./tooltip/PositionTT";

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

function getTT(type: FieldType, ref: RRefHook<HTMLInputElement | null>): ReactNode {
    switch(type) {
        case "id":
            return <IdTT target={ref}/>
        case "vector":
            return <PositionTT target={ref}/>
        default:
            return <></>
    }
}

export default function Field({ name, type, label, inputs }: FieldProps) {
    const inpRef = useRef<HTMLInputElement | null>(null)
    const tt = useMemo(() => getTT(type, inpRef), [type, inpRef])
    
    return (
        <div>
            <label className="mb-1 block">{ capitalize(label) }</label>
            <input ref={inpRef}
                onChange={(e) => { setRef(inputs, name, e.target.value); }}/>
            { tt }
        </div>
    )
}