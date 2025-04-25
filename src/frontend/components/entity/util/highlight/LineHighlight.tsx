import { Line } from "react-konva"
import { ET_EDGE } from "+/util/typings"
import { HighlightConfigProps, VisiblityControl } from "../HighlightGroup"

export interface LineHighlightProps extends HighlightConfigProps {
    type: ET_EDGE
    points: number[]
}

export default function LineHighlight({ points, color, visible }: LineHighlightProps & VisiblityControl) {
    return <Line points={points} stroke={color} strokeWidth={5} visible={visible}/>
}
