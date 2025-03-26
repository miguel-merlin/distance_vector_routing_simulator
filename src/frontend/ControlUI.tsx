import { JSX, useCallback, useState } from "react"
import AddEdge from "./components/control/panel/AddEdge"
import AddNode from "./components/control/panel/AddNode"
import Delete from "./components/control/panel/Delete"
import Scrubber from "./components/control/Scrubber"
import { Entity, EntityMap, uid } from "./util/entity"

type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>

function panelChanger(setter: StateDispatch<JSX.Element>, to: JSX.Element) {
    return () => setter(to)
}

export interface ControlUIProps {
    env: EntityMap
    setEnv: StateDispatch<EntityMap>
}

export default function ControlUI({ env, setEnv }: ControlUIProps) {
    const [panel, setPanel] = useState<JSX.Element>(<></>)
    const setter = useCallback((id: uid, ent: Entity | null) => {
        if(ent) env.set(id, ent)
        else env.delete(id)
        setEnv(new Map(env.entries()))
    }, [env])

    const actionMap = [
        { msg: "Add Node", panel: <AddNode envSetter={setter}/> },
        { msg: "Add Edge", panel: <AddEdge envSetter={setter}/> },
        { msg: "Delete", panel: <Delete envSetter={setter}/> }
    ]

    return (
        <div className="w-full h-full">
            <div className="border-b-2 flex flex-col justify-center p-2 gap-2">
                <Scrubber/>
                <div className="flex justify-center gap-2">
                    { actionMap.map(
                        ({ msg, panel }) => 
                            <button onClick={panelChanger(setPanel, panel)}>
                                { msg }
                            </button>
                    )}
                </div>
            </div>
            <div> { panel } </div>
        </div>
    )
}