import { Line, Circle } from "react-konva"
import { ET } from "../../../util/typings"

export interface HighlightConfigProps {
    type: ET
    color: string
}

export interface CircleHighlightProps extends HighlightConfigProps {
    size: number
}

export interface LineHighlightProps extends HighlightConfigProps {
    points: number[]
}

export type HighlightProps = CircleHighlightProps | LineHighlightProps

function LineHighlight({ points, color }: LineHighlightProps) {
    return <Line points={points} fill={color} scaleY={1.5}/>
}

function CircleHighlight({ size, color }: CircleHighlightProps) {
    return <Circle fill={color} radius={size + 2.5} strokeEnabled={false}/>
}

export default function Highlight(props: HighlightConfigProps) {
    switch(props.type) {
        case "ET_NODE": return CircleHighlight(props as CircleHighlightProps)
        case "ET_EDGE": return LineHighlight(props as LineHighlightProps)
    }
}