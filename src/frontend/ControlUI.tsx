import { JSX, useState } from "react"
import AddEdge from "./components/control/panel/AddEdge"
import AddNode from "./components/control/panel/AddNode"
import Delete from "./components/control/panel/Delete"
import Scrubber from "./components/control/Scrubber"

type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>

const actionMap = [
    { msg: "Add Node", panel: <AddNode/> },
    { msg: "Add Edge", panel: <AddEdge/> },
    { msg: "Delete", panel: <Delete/> }
]

function panelChanger(setter: StateDispatch<JSX.Element>, to: JSX.Element) {
    return () => setter(to)
}

export default function ControlUI() {
    const [panel, setPanel] = useState<JSX.Element>(<></>)

    return (
        <div>
            <Scrubber/>
            <div>
                { actionMap.map(
                    ({ msg, panel }) => 
                        <button onClick={panelChanger(setPanel, panel)}>
                            { msg }
                        </button>
                )}
            </div>
            <div> { panel } </div>
        </div>
    )
}