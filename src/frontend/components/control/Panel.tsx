import Field, { RawInputContainer } from "./util/Field"
import { RRefHook } from "+/util/react-aliases"
import { Vector2d } from "konva/lib/types"
import { uid } from "+/util/entity"

export type FieldType = "number" | "string" | "vector" | "id" | "id_list"
type FieldValue = number | string | Vector2d | uid[] | undefined
type FieldConf = { key: string, label?: string, type: FieldType }
type InputContainer = Record<string, FieldValue>

export interface PanelProps {
    fields: FieldConf[]
    inputs: RRefHook<RawInputContainer>
    onSubmit: (f: InputContainer) => void
}

function parseFieldValue(type: FieldType, rawVal: string) : FieldValue {
    switch(type) {
        case "number":
            return Number.parseInt(rawVal)
        case "vector":
            const coords = rawVal.match(/\d+/g)
            if(!coords || coords.length !== 2) throw new Error(`Malformed vector given ${rawVal}`)
            return { x: Number.parseInt(coords[0]), y: Number.parseInt(coords[1]) }
        case "id_list":
            if(rawVal === "[]") {
                return []
            }
            const uids = rawVal.match(/[a-zA-Z_\-0-9]+/g)
            return uids ? uids.map((v) => v) : undefined
        case "string":
        case "id":
            return rawVal
        default:
            throw new Error(`Unknown fieldType provided ${type}`)
    }
}

export default function Panel({ inputs, fields, onSubmit }: PanelProps) {
    return (
        <form 
            className="w-full h-full flex flex-col gap-y-2 p-5"
            onSubmit={(e) => {
                e.preventDefault()
                const inp = fields
                    .map(({ key, type }) => {
                        const rawInps = inputs.current
                        const rawV = rawInps[key]
                        if(!rawV) return {}
                        return { [key]: parseFieldValue(type, rawV) }
                    })
                    .reduce((p, c) => ({...p, ...c}))
                onSubmit(inp)
            }}>
            { fields.map(({ label, key, type }, idx) => 
                <Field key={idx} name={key} type={type} label={label || key} inputs={inputs}/>)
            }
            
            <button>Submit</button>
        </form>
    )
}