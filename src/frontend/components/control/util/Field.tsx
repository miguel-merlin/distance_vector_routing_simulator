import { RStateHook } from "../../../util/react-aliases";

export type RawInputContainer = Record<string, string>
export interface FieldProps {
    name: string
    label: string
    inputContainer: RStateHook<RawInputContainer>
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1)
}

export default function Field({ name, label, inputContainer }: FieldProps) {
    const [inp, setter] = inputContainer
    return (
        <div>
            <label className="mb-1 block">{ capitalize(label) }</label>
            <input value={inp[name]} 
                onChange={(e) => { setter({...inp, [name]: e.target.value}) }}/>
        </div>
    )
}