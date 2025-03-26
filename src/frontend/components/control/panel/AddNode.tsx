import PanelWrapper from "./util/PanelWrapper";

export default function AddNode() {
    return (
        <PanelWrapper>
            <h1 className="text-center underline decoration-solid font-bold">Add Node</h1>
            <label>Id</label>
            <input/>
            <label>Name</label>
            <input/>
            <label>X</label>
            <input/>
            <label>Y</label>
            <input/>
        </PanelWrapper>
    )
}