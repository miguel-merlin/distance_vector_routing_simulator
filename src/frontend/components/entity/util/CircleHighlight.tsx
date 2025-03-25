import { Circle } from "react-konva";

export interface CircleHighlightProps {
    size: number
    color: string
}

export default function CircleHighlight({ size, color }: CircleHighlightProps) {
    return <Circle fill={color} radius={size + 2.5} strokeEnabled={false}/>
}