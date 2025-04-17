import { ClickContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { useContext, useRef, useState } from "react";

export interface PositionTTProps {
    target: RRefHook<HTMLInputElement | null>
    trigger: (s: string) => void
}

export default function PositionTT({ target, trigger }: PositionTTProps) {
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
                            const v = `(${Math.floor(pos.x)}, ${Math.floor(pos.y)})`
                            target.current.value = `(${Math.floor(pos.x)}, ${Math.floor(pos.y)})`
                            trigger(v)
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