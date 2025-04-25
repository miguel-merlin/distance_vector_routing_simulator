import { Circle } from "react-konva"
import { ET_NODE } from "+/util/typings"
import { HighlightConfigProps, VisiblityControl } from "../HighlightGroup"

export interface CircleHighlightProps extends HighlightConfigProps {
    type: ET_NODE
    size: number
}

export default function CircleHighlight({ size, color, visible }: CircleHighlightProps & VisiblityControl) {
    return <Circle fill={color} radius={size + 5} strokeEnabled={false} visible={visible}/>
}