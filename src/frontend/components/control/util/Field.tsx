import { RRefHook } from "../../../util/react-aliases";

export type RawInputContainer = Record<string, string>
export interface FieldProps {
    name: string
    label: string
    inputs: RRefHook<RawInputContainer>
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1)
}

function setRef(ref: RRefHook<RawInputContainer>, k: string, v: string) {
    ref.current = {...ref.current, [k]: v}
}

export default function Field({ name, label, inputs }: FieldProps) {
    
    return (
        <div>
            <label className="mb-1 block">{ capitalize(label) }</label>
            <input
                onChange={(e) => { setRef(inputs, name, e.target.value); }}/>
        </div>
    )
}