import { Text } from "react-konva";
import { Text as KonvaText } from "konva/lib/shapes/Text";

export interface LabelProps {
    label: string
    color: string
    fontSize: number
    fontFamily: string
}

export default function Label({ label, color, fontSize, fontFamily }: LabelProps) {
    const el = new KonvaText({
        text: label,
        fontSize: fontSize,
    })

    const { width, height } = el.getClientRect()
    const offset = { x: width / 2, y: height / 2 }
    el.offset(offset)
    return <Text text={label} fill={color} fontSize={fontSize} fontFamily={fontFamily} offset={offset}/>
}