import { JSX, useRef, useState } from "react"
import Scrubber from "./components/control/Scrubber"
import { EntityMap } from "+/util/entity"
import Panel from "./components/control/Panel"
import { ACTION_MAP } from "+/util/actions"
import { RStateHook } from "+/util/react-aliases"
import { RawInputContainer } from "./components/control/util/Field"

export interface ControlUIProps {
    envState: RStateHook<EntityMap>
    pausedState: RStateHook<boolean>
}

export default function ControlUI({ envState, pausedState }: ControlUIProps) {
    const [panel, setPanel] = useState<JSX.Element>(<></>)
    const inputs = useRef<RawInputContainer>({})
    const actionMap = [
        { msg: "Add Node", panelProps: {inputs, ...ACTION_MAP["CTRL_ADDNODE"](envState)} },
        { msg: "Add Edge", panelProps: {inputs, ...ACTION_MAP["CTRL_ADDEDGE"](envState)} },
        { msg: "Add Emitter", panelProps: {inputs, ...ACTION_MAP["CTRL_ADDEMIT"](envState)} },
        { msg: "Delete", panelProps: {inputs, ...ACTION_MAP["CTRL_DELETE"](envState)} }
    ]

    return (
        <div className="w-full h-full">
            <div className="border-b-2 flex flex-col justify-center p-2 gap-2">
                <Scrubber pausedState={pausedState}/>
                <div className="flex justify-center gap-2">
                    { actionMap.map(
                        ({ msg, panelProps }, idx) => 
                            <button key={idx} 
                                onClick={() => { 
                                    inputs.current = {} 
                                    setPanel(<Panel key={idx} {...panelProps}/>)
                                }}>
                                {msg}
                            </button>
                    )}
                </div>
            </div>
            <div> { panel } </div>
        </div>
    )
}