import { ClickContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { useContext, useRef, useState } from "react";

export interface IdTTProps {
    target: RRefHook<HTMLInputElement | null>
}

export default function IdTT({ target }: IdTTProps) {
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
                            const ent = r.getTarget()
                            if(target.current && ent) {
                                target.current.value = ent.getAs().id
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
                { active ? "Cancel" : "Set Id" }
            </button>
        )
}