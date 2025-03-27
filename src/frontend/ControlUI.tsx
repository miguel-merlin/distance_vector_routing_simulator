import { JSX, useEffect, useMemo, useState } from "react"
import Scrubber from "./components/control/Scrubber"
import { EntityMap } from "./util/entity"
import Panel, { PanelProps } from "./components/control/Panel"
import { ACTION_MAP, StatelessPanelProp } from "./util/actions"
import { RStateHook } from "./util/react-aliases"
import { RawInputContainer } from "./components/control/util/Field"

export interface ControlUIProps {
    envState: RStateHook<EntityMap>
}

function fillAction(container: RStateHook<RawInputContainer>, partialPanel: StatelessPanelProp): PanelProps {
    return { 
        inputState: container,
        ...partialPanel
    }
}

export default function ControlUI({ envState }: ControlUIProps) {
    const [panel, setPanel] = useState<JSX.Element>(<></>)
    const [idx, setIdx] = useState<number>(0)
    const inputState = useState<RawInputContainer>({})
    const actionMap = useMemo(() => [
        { msg: "Add Node", panel: <Panel {...fillAction(inputState, ACTION_MAP["CTRL_ADDNODE"](envState))}/> },
        { msg: "Add Edge", panel: <Panel {...fillAction(inputState, ACTION_MAP["CTRL_ADDEDGE"](envState))}/> },
        { msg: "Delete", panel: <Panel {...fillAction(inputState, ACTION_MAP["CTRL_DELETE"](envState))}/> }
    ], [inputState[0]])

    useEffect(() => setPanel(actionMap[idx].panel), [inputState[0]])

    return (
        <div className="w-full h-full">
            <div className="border-b-2 flex flex-col justify-center p-2 gap-2">
                <Scrubber/>
                <div className="flex justify-center gap-2">
                    { actionMap.map(
                        ({ msg, panel }, idx) => 
                            <button key={idx} onClick={() => { setPanel(panel); setIdx(idx) }}>
                                { msg }
                            </button>
                    )}
                </div>
            </div>
            <div> { panel } </div>
        </div>
    )
}