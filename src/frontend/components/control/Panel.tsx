import Field, { RawInputContainer } from "./util/Field"
import { RStateHook } from "../../util/react-aliases"

type FieldConf = { key: string, label?: string, type: "number" | "string" }
type InputContainer = Record<string, number | string>

export interface PanelProps {
    fields: FieldConf[]
    inputState: RStateHook<RawInputContainer>
    onSubmit: (f: InputContainer) => void
}

export default function Panel({ inputState, fields, onSubmit }: PanelProps) {
    return (
        <form 
            className="w-full h-full flex flex-col gap-y-2 p-5"
            onSubmit={(e) => {
                e.preventDefault()
                console.log(inputState[0])
                const inp = fields
                    .map(({ key, type }) => {
                        const [rawInps] = inputState
                        const rawV = rawInps[key]
                        const v = type === "number" ? Number.parseInt(rawV) : rawV
                        return { [key]: v }
                    })
                    .reduce((p, c) => ({...p, ...c}))
                onSubmit(inp)
            }}>
            { fields.map(({ label, key }, idx) => 
                <Field key={idx} name={key} label={label || key} inputContainer={inputState}/>)
            }
            
            <button>Submit</button>
        </form>
    )
}