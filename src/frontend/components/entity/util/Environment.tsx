import { EntityContext, TimeContext, EventContext} from "+/util/contexts";
import { EventQueue } from "+/util/sim-event";
import { EntityMap } from "+/util/entity";
import { useEffect, useRef, useState } from "react";

const interval = 1000

export interface EnvironmentProps {
    paused?: boolean
    entMap: EntityMap
    children?: React.ReactNode | React.ReactNode[]
}

export default function Environment({ paused, entMap, children }: EnvironmentProps) {
    const [t, setT] = useState(0)
    const eventRefs = useRef<EventQueue>([])

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
                <EventContext value={eventRefs.current}>
                    { children }
                </EventContext>
            </TimeContext>
        </EntityContext>
    )
}