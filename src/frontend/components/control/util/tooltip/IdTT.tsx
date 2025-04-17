import { ClickContext } from "+/util/contexts";
import { RRefHook } from "+/util/react-aliases";
import { useContext, useState } from "react";

export interface IdTTProps {
    target: RRefHook<HTMLInputElement | null>
}

export default function IdTT({ target }: IdTTProps) {
    const record = useContext(ClickContext)
    const [active, setActive] = useState(false)

    return (
        <button onClick={
            async (e) => { 
                e.preventDefault()
                setActive(!active)

                if(active) {
                    try {
                        const { target: ent } = await record.waitForUpdate()
                        if(target.current && ent) {
                            target.current.value = ent.getAs().id
                        }
                    } catch(e) {
                        console.log(e)
                    }
                }
                else {
                    record.cancel()
                }
            }}>
            { active ? "Cancel" : "Set Id" }
        </button>
    )
}