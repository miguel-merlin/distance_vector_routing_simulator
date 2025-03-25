import { Text } from "react-konva";

export interface LabelProps {
    label: string
    color: string
    fontSize: number
    fontFamily: string
}

export default function Label({ label, color, fontSize, fontFamily }: LabelProps) {
    return <Text text={label} fill={color} fontSize={fontSize} fontFamily={fontFamily}/>
}