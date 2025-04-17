import { ClickContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { useContext, useRef, useState } from "react";

export interface PositionTTProps {
    target: RRefHook<HTMLInputElement | null>
}

export default function PositionTT({ target }: PositionTTProps) {
    const record = useContext(ClickContext)
    const [active, setActive] = useState(false)
    const abortRef = useRef<AbortController | null>(null)

    return (
        <button onClick={
            async (e) => { 
                e.preventDefault()
                const state = !active
                setActive(state)

                if(state) {
                    const [res, cancel] = record.waitForUpdate()
                    abortRef.current = cancel
                    try {
                        const r = await res
                        const pos = r.getPosition()
                        if(target.current && pos) {
                            target.current.value = `(${pos.x}, ${pos.y})`
                        }
                        setActive(false)
                    } catch(e) {
                        console.log(e)
                    }
                }
                else {
                    if(abortRef.current)
                        abortRef.current.abort()
                }
            }}>
            { active ? "Cancel" : "Set Position" }
        </button>
    )
}