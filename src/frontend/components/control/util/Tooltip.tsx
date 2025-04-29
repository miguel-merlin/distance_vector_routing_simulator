import { ClickRecord } from "+/interfaces/ClickRecord"
import { ClickContext } from "+/util/contexts"
import { useContext, useRef, useState } from "react"

export interface TooltipProps {
    onFullfilled: (record: ClickRecord) => void
    text: string
    cancelText?: string
}

export default function Tooltip({ onFullfilled, text, cancelText }: TooltipProps) {
    const record = useContext(ClickContext)
    const [active, setActive] = useState(false)
    const abortRef = useRef<AbortController | null>(null)

    return (
        <button
            onClick={
                async (e) => {
                    e.preventDefault()
                    const state = !active
                    record.flush()
                    setActive(state)

                    if(state) {
                        const [res, cancel] = record.waitForUpdate()
                        abortRef.current = cancel

                        try {
                            const rec = await res
                            onFullfilled(rec)
                            setActive(false)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    else if(abortRef.current) {
                        abortRef.current.abort()
                    }
                }
            }>
            { active ? (cancelText || "Cancel") : text }
        </button>
    )
}