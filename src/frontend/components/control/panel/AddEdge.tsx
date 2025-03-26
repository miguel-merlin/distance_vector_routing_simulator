import PanelWrapper from "./util/PanelWrapper";

export default function AddEdge() {
    return (
        <PanelWrapper>
            <h1 className="text-center underline decoration-solid font-bold">Add Edge</h1>
            <label>Id</label>
            <input/>
            <label>Head Id</label>
            <input/>
            <label>Tail Id</label>
            <input/>
        </PanelWrapper>
    )
}