import { Line } from "react-konva"

export interface LineHighlightProps {
    points: number[]
    color: string
}

export default function LineHighlight({ points, color }: LineHighlightProps) {
    return <Line points={points} fill={color} scaleY={1.5}/>
}