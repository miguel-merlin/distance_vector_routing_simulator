import { Line, Circle, Rect } from "react-konva"
import { ET_EDGE, ET_EMIT, ET_NODE } from "+/util/typings"

export interface HighlightConfigProps {
    color: string
    visible: boolean
}

export interface ShapeHighlightProps extends HighlightConfigProps {
    type: ET_NODE | ET_EMIT
    size: number
}

export interface LineHighlightProps extends HighlightConfigProps {
    type: ET_EDGE
    points: number[]
}

export type HighlightProps = 
    ShapeHighlightProps | LineHighlightProps

function LineHighlight({ points, color, visible }: LineHighlightProps) {
    return <Line points={points} stroke={color} strokeWidth={5} visible={visible}/>
}

function CircleHighlight({ size, color, visible }: ShapeHighlightProps) {
    return <Circle fill={color} radius={size + 5} strokeEnabled={false} visible={visible}/>
}

function RectHighlight({ size, color, visible }: ShapeHighlightProps) {
    const scaled = size + 10
    return <Rect fill={color} width={scaled} height={scaled} 
                strokeEnabled={false} visible={visible}
                offsetX={5} offsetY={5}/>
}

export default function Highlight(props: HighlightProps) {
    switch(props.type) {
        case "ET_NODE": return CircleHighlight(props as ShapeHighlightProps)
        case "ET_EDGE": return LineHighlight(props as LineHighlightProps)
        case "ET_EMIT": return RectHighlight(props as ShapeHighlightProps)
    }
}