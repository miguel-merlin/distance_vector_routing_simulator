import { EntityContext, TimeContext, EventContext} from "+/util/contexts";
import { EventHandler, EventQueue } from "+/util/sim-event";
import { EntityMap } from "+/util/entity";
import { useEffect, useRef, useState } from "react";

const interval = 1000

export interface EnvironmentProps {
    paused?: boolean
    entMap: EntityMap
    eventHandler: EventHandler
    children?: React.ReactNode | React.ReactNode[]
}

export default function Environment({ paused, entMap, eventHandler, children }: EnvironmentProps) {
    const [t, setT] = useState(0)
    const eventRefs = useRef<EventQueue>([])

    useEffect(() => {
        setTimeout(() => {
            if(!paused) {
                const res = eventHandler(eventRefs.current, t)
                eventRefs.current = res
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