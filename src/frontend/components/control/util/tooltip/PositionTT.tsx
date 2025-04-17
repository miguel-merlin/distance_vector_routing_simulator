import { ClickContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { useContext, useState } from "react";

export interface PositionTTProps {
    target: RRefHook<HTMLInputElement | null>
}

export default function PositionTT({ target }: PositionTTProps) {
    const record = useContext(ClickContext)
    const [active, setActive] = useState(false)

    return (
        <button onClick={
            async (e) => { 
                e.preventDefault()
                setActive(!active)

                if(active) {
                    try {
                        const { pos } = await record.waitForUpdate()
                        if(target.current && pos) {
                            target.current.value = `(${pos.x}, ${pos.y})`
                        }
                    } catch(e) {
                        console.log(e)
                    }
                }
                else {
                    record.cancel()
                }
            }}>
            { active ? "Cancel" : "Set Position" }
        </button>
    )
}