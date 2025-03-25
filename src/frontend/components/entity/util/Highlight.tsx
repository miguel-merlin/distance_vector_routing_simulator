import { Line, Circle } from "react-konva"
import { ET_EDGE, ET_NODE } from "../../../util/typings"

export interface HighlightConfigProps {
    color: string
    visible: boolean
}

export interface CircleHighlightProps extends HighlightConfigProps {
    type: ET_NODE
    size: number
}

export interface LineHighlightProps extends HighlightConfigProps {
    type: ET_EDGE
    points: number[]
}

export type HighlightProps = CircleHighlightProps | LineHighlightProps

function LineHighlight({ points, color, visible }: LineHighlightProps) {
    return <Line points={points} stroke={color} strokeWidth={5} visible={visible}/>
}

function CircleHighlight({ size, color, visible }: CircleHighlightProps) {
    return <Circle fill={color} radius={size + 5} strokeEnabled={false} visible={visible}/>
}

export default function Highlight(props: HighlightProps) {
    switch(props.type) {
        case "ET_NODE": return CircleHighlight(props as CircleHighlightProps)
        case "ET_EDGE": return LineHighlight(props as LineHighlightProps)
    }
}