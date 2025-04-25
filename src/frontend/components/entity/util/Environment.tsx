import { EntityContext, TimeContext } from "+/util/contexts";
import { EntityMap } from "+/util/entity";
import { useEffect, useState } from "react";

const interval = 1000

export interface EnvironmentProps {
    paused?: boolean
    entMap: EntityMap
    children?: React.ReactNode | React.ReactNode[]
}

export default function Environment({ paused, entMap, children }: EnvironmentProps) {
    const [t, setT] = useState(0)

    useEffect(() => {
        if(paused) return
        setTimeout(() => { 
            if(!paused) {
                setT(t + 1)
            }
        }, interval)
    }, [t, paused])

    return (
        <EntityContext value={entMap}>
            <TimeContext value={t}>
                { children }
            </TimeContext>
        </EntityContext>
    )
}